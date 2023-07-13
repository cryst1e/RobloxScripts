import requests
import hashlib
import os
import math
import time
import sys
import subprocess

ScriptVersion = 1.2

def build():
    def clear():
        os.system("cls" if os.name == "nt" else "clear")

    clear()

    def printTitle():
        TEXT = r'''
         ██████╗████████╗██████╗ ██████╗ 
        ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
        ██║        ██║   ██████╔╝██████╔╝
        ██║        ██║   ██╔═══╝ ██╔══██╗
        ╚██████╗   ██║   ██║     ██████╔╝
         ╚═════╝   ╚═╝   ╚═╝     ╚═════╝ 
                                        
        '''

        GRADIENT_STEPS = len(TEXT.strip().split("\n")[0]) - 1
        R_INC = (0 - 160) / GRADIENT_STEPS
        G_INC = (130 - 190) / GRADIENT_STEPS
        B_INC = (180 - 220) / GRADIENT_STEPS

        for line in TEXT.split("\n"):
            print(" " * 35, end="")
            for i, char in enumerate(line):
                r = int(160 + (R_INC * i))
                g = int(190 + (G_INC * i))
                b = int(220 + (B_INC * i))
                color_code = f"\033[38;2;{r};{g};{b}m"
                print(f"{color_code}{char}", end="")
            print("\033[0m")

    def printSelection():
        WelcomeText = "Welcome To CTP Utilities!"
        ChoiceText = r'''
        1) Login
        2) Register
        4) Account info
        3) Credit
        '''

        GRADIENT_STEPS = len(WelcomeText) - 1
        R_INC = (255 - 255) / GRADIENT_STEPS
        G_INC = (255 - 255) / GRADIENT_STEPS
        B_INC = (255 - 0) / GRADIENT_STEPS
        print(" " * 47, end="")
        for i, char in enumerate(WelcomeText):
            r = int(255 - (R_INC * i))
            g = int(255 - (G_INC * i))
            b = int(255 - (B_INC * i))
            color_code = f"\033[38;2;{r};{g};{b}m"
            print(f"{color_code}{char}", end="")

        print("\n\n")

        for line in ChoiceText.split("\n"):
            if line.strip().startswith("1) Login"):
                print(" " * 20, end="")

            for i, char in enumerate(line):
                r = int(255 - (R_INC * i))
                g = int(255 - (G_INC * i))
                b = int(255 - (B_INC * i))
                color_code = f"\033[38;2;{r};{g};{b}m"
                print(f"{color_code}{char}", end="")
        
        print("\033[0m")

    def inputChoice():
        Text = "Select Choice:"

        GRADIENT_STEPS = len(Text) - 1
        R_INC = (255 - 255) / GRADIENT_STEPS
        G_INC = (255 - 255) / GRADIENT_STEPS
        B_INC = (255 - 0) / GRADIENT_STEPS

        print(" " * 51, end="")
        for i, char in enumerate(Text):
            r = int(255 - (R_INC * i))
            g = int(255 - (G_INC * i))
            b = int(255 - (B_INC * i))
            color_code = f"\033[38;2;{r};{g};{b}m"
            print(f"{color_code}{char}", end="")
        
        choice = input("\033[38;2;70;130;180m ")
        print("\033[0m")
        
        return choice

    def printCredits():
        clear()
        CreditTitle = r'''
         ██████╗██████╗ ███████╗██████╗ ██╗████████╗███████╗
        ██╔════╝██╔══██╗██╔════╝██╔══██╗██║╚══██╔══╝██╔════╝
        ██║     ██████╔╝█████╗  ██║  ██║██║   ██║   ███████╗
        ██║     ██╔══██╗██╔══╝  ██║  ██║██║   ██║   ╚════██║
        ╚██████╗██║  ██║███████╗██████╔╝██║   ██║   ███████║
         ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝   ╚═╝   ╚══════╝
        '''
        CreditText = r'''
        Raven (awfw) | Developer
        Someone (ggboblol) | Developer
        HunterNTB (hunterntb) | Developer
        Sky here that helps (iam.sky) | Designer
        TheAdminHammer (nothammer43) | Developer
        '''
        max_line_length = max(len(line.strip()) for line in CreditText.split("\n"))
        GRADIENT_STEPS = len(CreditText.strip().split("\n")[0]) - 1
        R_INC = (0 - 160) / GRADIENT_STEPS
        G_INC = (130 - 190) / GRADIENT_STEPS
        B_INC = (180 - 220) / GRADIENT_STEPS

        for line in CreditTitle.split("\n"):
            print(" " * 27, end="")
            for i, char in enumerate(line):
                r = int(160 + (R_INC * i))
                g = int(190 + (G_INC * i))
                b = int(220 + (B_INC * i))
                color_code = f"\033[38;2;{r};{g};{b}m"
                print(f"{color_code}{char}", end="")
            print("\033[0m")

        maxline_length = max(len(line.strip()) for line in CreditText.split("\n"))
        GRADIENT_STEPS = max_line_length - 1
        R_INC = (255 - 255) / GRADIENT_STEPS
        G_INC = (255 - 255) / GRADIENT_STEPS
        B_INC = (255 - 0) / GRADIENT_STEPS
        for line in CreditText.split("\n"):
            print(" " * (55 - max_line_length // 2), end="")
            for i, char in enumerate(line):
                r = int(255 - (R_INC * i))
                g = int(255 - (G_INC * i))
                b = int(255 - (B_INC * i))
                color_code = f"\033[38;2;{r};{g};{b}m"
                print(f"{color_code}{char}", end="")
            print("\033[0m")

        input(" " * 47 + "\033[38;2;70;130;180m Press enter to go back")
        print("\033[0m")
        clear()
        build()

    def printInfo():
        AccountInfo = r'''
        ██╗███╗   ██╗███████╗ ██████╗ 
        ██║████╗  ██║██╔════╝██╔═══██╗
        ██║██╔██╗ ██║█████╗  ██║   ██║
        ██║██║╚██╗██║██╔══╝  ██║   ██║
        ██║██║ ╚████║██║     ╚██████╔╝
        ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝ 
        '''

        clear()
        max_line_length = max(len(line.strip()) for line in AccountInfo.split("\n"))
        GRADIENT_STEPS = len(AccountInfo.strip().split("\n")[0]) - 1
        R_INC = (0 - 160) / GRADIENT_STEPS
        G_INC = (130 - 190) / GRADIENT_STEPS
        B_INC = (180 - 220) / GRADIENT_STEPS

        for line in AccountInfo.split("\n"):
            print(" " * 36, end="")
            for i, char in enumerate(line):
                r = int(160 + (R_INC * i))
                g = int(190 + (G_INC * i))
                b = int(220 + (B_INC * i))
                color_code = f"\033[38;2;{r};{g};{b}m"
                print(f"{color_code}{char}", end="")
            print("\033[0m")

        blueColorCode = "\033[38;2;0;182;255m"
        greenColorCode = "\033[38;2;94;255;108m"
        print(" "*50+blueColorCode+"Welcome back, "+greenColorCode+"Sky", end="")
        print("\n"+" "*49+blueColorCode+"Created At: "+greenColorCode+"2023-1-1", end="")
        print("\n"+" "*48+blueColorCode+"Last Login At: "+greenColorCode+"2023-1-1", end="")
        print("\n"+" "*49+blueColorCode+"Expires At: "+greenColorCode+"2023-1-1", end="")
        print("\033[0m")
        input("\n"+" " * 47 + "\033[38;2;70;130;180m Press enter to go back")
        print("\033[0m")
        clear()
        build()

    printTitle()
    printSelection()
    print("\n")
    Choice = inputChoice()
    if Choice.isdigit() and int(Choice) > 0 and int(Choice) < 5:
        if Choice == "3":
            printCredits()
        elif Choice == "1":
            print("Logging in...")
        elif Choice == "2":
            print("Registering...")
        elif Choice == "4":
            printInfo()
    else:
        build()

def print_gradient(text, color_start, color_end, amount_of_space):
    gradient_length = 20
    print(" "*amount_of_space, end="")
    for i in range(len(text)):
        color_ratio = i / (len(text) - 1)
        r = int((1 - color_ratio) * color_start[0] + color_ratio * color_end[0])
        g = int((1 - color_ratio) * color_start[1] + color_ratio * color_end[1])
        b = int((1 - color_ratio) * color_start[2] + color_ratio * color_end[2])
        color_code = f"\033[38;2;{r};{g};{b}m"
        print(color_code + text[i], end='')

    print('\033[0m')

def download_file(url, file_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print_gradient("Successfully downloaded new version!", (219, 255, 219), (5, 255, 5), 42)
        print_gradient("Restarting file...", (168, 209, 255), (43, 146, 255), 52)
        time.sleep(3)
        reopen_file(file_path)
    else:
        print_gradient(f"Failed to download file | {response.status_code}", (255, 207, 207), (255, 59, 59), 45)

def update_file(remote_url, local_file_path):
    remote_content = requests.get(remote_url).text
    local_md5 = calculate_md5(local_file_path)

    if hashlib.md5(remote_content.encode('utf-8')).hexdigest() != local_md5:
        print_gradient("New version available!", (219, 255, 219), (5, 255, 5), 49)
        print_gradient("Updating the file", (255, 255, 224), (255, 255, 0), 51)
        time.sleep(1)
        download_file(remote_url, local_file_path)
    else:
        print_gradient("Version Up To Data!", (219, 255, 219), (5, 255, 5), 50)
        time.sleep(2)
        build()

def calculate_md5(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        return hashlib.md5(data).hexdigest()

def reopen_file(file_path):
    if sys.platform.startswith('win32'):
        os.startfile(file_path)
    elif sys.platform.startswith('linux') or sys.platform.startswith('darwin'):
        opener = 'open' if sys.platform == 'darwin' else 'xdg-open'
        subprocess.call([opener, file_path])

remote_url = "https://raw.githubusercontent.com/cryst1e/RobloxScripts/main/main.py"
local_file_path = "main.py"

os.system("cls" if os.name == "nt" else "clear")

Updater = r'''
██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗██████╗ 
██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗  ██████╔╝
██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝  ██╔══██╗
╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗██║  ██║
 ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
'''
max_line_length = max(len(line.strip()) for line in Updater.split("\n"))
GRADIENT_STEPS = len(Updater.strip().split("\n")[0]) - 1
R_INC = (0 - 160) / GRADIENT_STEPS
G_INC = (130 - 190) / GRADIENT_STEPS
B_INC = (180 - 220) / GRADIENT_STEPS

for line in Updater.split("\n"):
    print(" " * 31, end="")
    for i, char in enumerate(line):
        r = int(160 + (R_INC * i))
        g = int(190 + (G_INC * i))
        b = int(220 + (B_INC * i))
        color_code = f"\033[38;2;{r};{g};{b}m"
        print(f"{color_code}{char}", end="")
    print("\033[0m")

print_gradient("Current Script Version: " + str(ScriptVersion), (255, 255, 224), (255, 255, 0), 47)
time.sleep(2)
print_gradient("Checking For Updateds", (255, 255, 224), (255, 255, 0), 49)
time.sleep(1)
update_file(remote_url, local_file_path)
