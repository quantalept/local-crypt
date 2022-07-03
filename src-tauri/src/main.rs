#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

use std::{fs::File, io::Write};

#[tauri::command]
fn save_file(path: String, content: String) -> String {
    println!("path {}", path);
    if let Ok(mut f) = File::create(path){
      f.write_all(content.as_bytes());
    }
    
    return String::from("done")
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let close = CustomMenuItem::new("close".to_string(), "Close");
  let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_submenu(submenu);

  println!("Application started");

  tauri::Builder::default()
    .menu(menu)
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
