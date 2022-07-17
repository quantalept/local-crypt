#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

use std::{fs::File, io::Write};
use std::io::ErrorKind;
use std::fs;


#[tauri::command]
fn save_file(path: String, content: String) -> Result<String, String> {
    println!("path {}", path);
    let f = File::options().write(true).open(path.clone());
    let mut f = match f {
      Ok(f) => f,
      Err(e) => match e.kind(){
        ErrorKind::NotFound => match File::create(path.clone()) {
          Ok(f) => f,
          Err(err) => return Err(err.to_string())
        }, other_err => {
          return Err(other_err.to_string())
        }
      },
    };

    match f.write_all(content.as_bytes()){
      Ok(_) => Ok(String::from("Success")),
      Err(err) => return Err(err.to_string())
    }

    
}

#[tauri::command]
fn read_file(path: String) -> String {

  match fs::read_to_string(path){
    Ok(content) => content,
    Err(_err) => return String::from("Error opening file")
  }

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
    .invoke_handler(tauri::generate_handler![save_file, read_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
