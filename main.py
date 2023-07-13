import requests
import hashlib
import os

ScriptVersion = 2

print("Script Version: "+str(ScriptVersion))

def download_file(url, file_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Successfully downloaded {file_path}")
    else:
        print(f"Failed to download file from {url}")

def calculate_md5(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        return hashlib.md5(data).hexdigest()

def update_file(remote_url, local_file_path):
    remote_content = requests.get(remote_url).text
    local_md5 = calculate_md5(local_file_path)

    if hashlib.md5(remote_content.encode('utf-8')).hexdigest() != local_md5:
        print("Updating the file...")
        download_file(remote_url, local_file_path)
    else:
        print("The file is already up to date.")

remote_url = "https://raw.githubusercontent.com/cryst1e/RobloxScripts/main/main.py"
local_file_path = "main.py"

update_file(remote_url, local_file_path)
