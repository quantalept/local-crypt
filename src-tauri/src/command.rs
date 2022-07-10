use std::fs::File;
use std::io::prelude::*;

#[tauri::command]
saveFile(path: String, content: String) -> String {
    println!("path", path)
    let mut f = File::create(path)?;
    f.write_all(b""+content)?;

    f.sync_all()?;
    return Ok(())
}