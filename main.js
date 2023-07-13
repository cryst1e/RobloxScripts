const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const readlineSync = require('readline-sync');

const ScriptVersion = 1.2;
  
function build() {
  function clear() {
    console.clear();
  }

  clear();

  function printTitle() {
    const TEXT = `
         ██████╗████████╗██████╗ ██████╗ 
        ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
        ██║        ██║   ██████╔╝██████╔╝
        ██║        ██║   ██╔═══╝ ██╔══██╗
        ╚██████╗   ██║   ██║     ██████╔╝
         ╚═════╝   ╚═╝   ╚═╝     ╚═════╝ 
                                        
        `;

    const maxLineLength = Math.max(...TEXT.split('\n').map((line) => line.trim().length));
    const gradientSteps = TEXT.trim().split('\n')[0].length - 1;
    const rInc = (0 - 160) / gradientSteps;
    const gInc = (130 - 190) / gradientSteps;
    const bInc = (180 - 220) / gradientSteps;
    
    TEXT.split('\n').forEach((line) => {
      let coloredLine = ' '.repeat(35);
      for (let i = 0; i < line.length; i++) {
        const r = Math.floor(160 + rInc * i);
        const g = Math.floor(190 + gInc * i);
        const b = Math.floor(220 + bInc * i);
        const colorCode = `\x1b[38;2;${r};${g};${b}m`;
        coloredLine += `${colorCode}${line[i]}`;
      }
      console.log(coloredLine + '\x1b[0m');
    });
  }
  function printSelection() {
    const WelcomeText = 'Welcome To CTP Utilities!';
    const ChoiceText = `
      1) Login
      2) Register
      3) Account info
      4) Credit
        `;

    const gradientSteps = WelcomeText.length - 1;
    const rInc = (255 - 255) / gradientSteps;
    const gInc = (255 - 255) / gradientSteps;
    const bInc = (255 - 0) / gradientSteps;

    let output = ' '.repeat(47);
    for (let i = 0; i < WelcomeText.length; i++) {
      const r = Math.floor(255 - rInc * i);
      const g = Math.floor(255 - gInc * i);
      const b = Math.floor(255 - bInc * i);
      const colorCode = `\x1b[38;2;${r};${g};${b}m`;
      output += `${colorCode}${WelcomeText[i]}`;
    }
    console.log(output + '\n\n');

    const lines = ChoiceText.split('\n');
    lines.forEach((line) => {
      let coloredLine = '';
      for (let i = 0; i < line.length; i++) {
        const r = Math.floor(255 - rInc * i);
        const g = Math.floor(255 - gInc * i);
        const b = Math.floor(255 - bInc * i);
        const colorCode = `\x1b[38;2;${r};${g};${b}m`;
        coloredLine += `${colorCode}${line[i]}`;
      }
      console.log(coloredLine);
    });
    console.log('\x1b[0m');
  }

  function inputChoice() {
    const Text = 'Select Choice:';

    const gradientSteps = Text.length - 1;
    const rInc = (255 - 255) / gradientSteps;
    const gInc = (255 - 255) / gradientSteps;
    const bInc = (255 - 0) / gradientSteps;

    let output = ' '.repeat(51);
    for (let i = 0; i < Text.length; i++) {
      const r = Math.floor(255 - rInc * i);
      const g = Math.floor(255 - gInc * i);
      const b = Math.floor(255 - bInc * i);
      const colorCode = `\x1b[38;2;${r};${g};${b}m`;
      output += `${colorCode}${Text[i]}`;
    }
    process.stdout.write(output);

    const choice = readlineSync.question('\x1b[38;2;70;130;180m ');
    console.log('\x1b[0m');
    return choice;
  }

  function printCredits() {
    clear();
    const CreditTitle = `
         ██████╗██████╗ ███████╗██████╗ ██╗████████╗███████╗
        ██╔════╝██╔══██╗██╔════╝██╔══██╗██║╚══██╔══╝██╔════╝
        ██║     ██████╔╝█████╗  ██║  ██║██║   ██║   ███████╗
        ██║     ██╔══██╗██╔══╝  ██║  ██║██║   ██║   ╚════██║
        ╚██████╗██║  ██║███████╗██████╔╝██║   ██║   ███████║
         ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝   ╚═╝   ╚══════╝
        `;
    const CreditText = `
        Raven (awfw) | Developer
        Someone (ggboblol) | Developer
        HunterNTB (hunterntb) | Developer
        Sky here that helps (iam.sky) | Designer
        TheAdminHammer (nothammer43) | Developer
        `;
    const maxLineLength = Math.max(...CreditText.split('\n').map((line) => line.trim().length));
    const gradientSteps = CreditText.trim().split('\n')[0].length - 1;
    const rInc = (0 - 160) / gradientSteps;
    const gInc = (130 - 190) / gradientSteps;
    const bInc = (180 - 220) / gradientSteps;

    CreditTitle.split('\n').forEach((line) => {
      let coloredLine = ' '.repeat(27);
      for (let i = 0; i < line.length; i++) {
        const r = Math.floor(160 + rInc * i);
        const g = Math.floor(190 + gInc * i);
        const b = Math.floor(220 + bInc * i);
        const colorCode = `\x1b[38;2;${r};${g};${b}m`;
        coloredLine += `${colorCode}${line[i]}`;
      }
      console.log(coloredLine + '\x1b[0m');
    });

    const gradientSteps2 = maxLineLength - 1;
    const rInc2 = (255 - 255) / gradientSteps2;
    const gInc2 = (255 - 255) / gradientSteps2;
    const bInc2 = (255 - 0) / gradientSteps2;
    CreditText.split('\n').forEach((line) => {
      let coloredLine = ' '.repeat(55 - Math.floor(maxLineLength / 2));
      for (let i = 0; i < line.length; i++) {
        const r = Math.floor(255 - rInc2 * i);
        const g = Math.floor(255 - gInc2 * i);
        const b = Math.floor(255 - bInc2 * i);
        const colorCode = `\x1b[38;2;${r};${g};${b}m`;
        coloredLine += `${colorCode}${line[i]}`;
      }
      console.log(coloredLine + '\x1b[0m');
    });

    readlineSync.question(' '.repeat(47) + '\x1b[38;2;70;130;180m Press enter to go back');
    console.log('\x1b[0m');
    clear();
    build();
  }

  function printInfo() {
    const AccountInfo = `
        ██╗███╗   ██╗███████╗ ██████╗ 
        ██║████╗  ██║██╔════╝██╔═══██╗
        ██║██╔██╗ ██║█████╗  ██║   ██║
        ██║██║╚██╗██║██╔══╝  ██║   ██║
        ██║██║ ╚████║██║     ╚██████╔╝
        ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝ 
        `;

    clear();
    const maxLineLength = Math.max(...AccountInfo.split('\n').map((line) => line.trim().length));
    const gradientSteps = AccountInfo.trim().split('\n')[0].length - 1;
    const rInc = (0 - 160) / gradientSteps;
    const gInc = (130 - 190) / gradientSteps;
    const bInc = (180 - 220) / gradientSteps;

    AccountInfo.split('\n').forEach((line) => {
      let coloredLine = ' '.repeat(36);
      for (let i = 0; i < line.length; i++) {
        const r = Math.floor(160 + rInc * i);
        const g = Math.floor(190 + gInc * i);
        const b = Math.floor(220 + bInc * i);
        const colorCode = `\x1b[38;2;${r};${g};${b}m`;
        coloredLine += `${colorCode}${line[i]}`;
      }
      console.log(coloredLine + '\x1b[0m');
    });

    const blueColorCode = '\x1b[38;2;0;182;255m';
    const greenColorCode = '\x1b[38;2;94;255;108m';
    console.log(' '.repeat(50) + blueColorCode + 'Welcome back, ' + greenColorCode + 'Sky');
    console.log(' '.repeat(49) + blueColorCode + 'Created At: ' + greenColorCode + '2023-1-1');
    console.log(' '.repeat(48) + blueColorCode + 'Last Login At: ' + greenColorCode + '2023-1-1');
    console.log(' '.repeat(49) + blueColorCode + 'Expires At: ' + greenColorCode + '2023-1-1');
    console.log('\x1b[0m');
    readlineSync.question('\n' + ' '.repeat(47) + '\x1b[38;2;70;130;180m Press enter to go back');
    console.log('\x1b[0m');
    clear();
    build();
  }

  printTitle();
  printSelection();
  console.log('\n');
  const choice = inputChoice();
  if (!isNaN(choice) && parseInt(choice) > 0 && parseInt(choice) < 5) {
    if (choice === '4') {
      printCredits();
    } else if (choice === '1') {
      console.log('Logging in...');
    } else if (choice === '2') {
      console.log('Registering...');
    } else if (choice === '3') {
      printInfo();
    }
  } else {
    build();
  }
}

function printGradient(text, colorStart, colorEnd, amountOfSpace) {
  const gradientLength = 20;
  process.stdout.write(' '.repeat(amountOfSpace));
  for (let i = 0; i < text.length; i++) {
    const colorRatio = i / (text.length - 1);
    const r = Math.floor((1 - colorRatio) * colorStart[0] + colorRatio * colorEnd[0]);
    const g = Math.floor((1 - colorRatio) * colorStart[1] + colorRatio * colorEnd[1]);
    const b = Math.floor((1 - colorRatio) * colorStart[2] + colorRatio * colorEnd[2]);
    const colorCode = `\x1b[38;2;${r};${g};${b}m`;
    process.stdout.write(colorCode + text[i]);
  }
  console.log('\x1b[0m');
}

function downloadFile(url, filePath) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  axios.get(url, { responseType: 'arraybuffer', httpsAgent })
    .then((response) => {
      fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
      printGradient('Successfully downloaded new version!', [219, 255, 219], [5, 255, 5], 42);
      printGradient('Please reopen the file to get the updated version!', [168, 209, 255], [43, 146, 255], 37);
      readlineSync.question();
    })
    .catch((error) => {
      printGradient(`Failed to download file | ${error.response.status}`, [255, 207, 207], [255, 59, 59], 45);
    });
}

function updateFile(remoteUrl, localFilePath) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  axios.get(remoteUrl, { httpsAgent })
    .then((response) => {
      const remoteContent = response.data;
      const localMd5 = calculateMd5(localFilePath);
      const remoteMd5 = crypto.createHash('md5').update(remoteContent).digest('hex');
      if (remoteMd5 !== localMd5) {
        printGradient('New version available!', [219, 255, 219], [5, 255, 5], 49);
        printGradient('Updating the file', [255, 255, 224], [255, 255, 0], 51);
        setTimeout(() => downloadFile(remoteUrl, localFilePath), 1000);
      } else {
        printGradient('Version Up To Date!', [219, 255, 219], [5, 255, 5], 50);
        setTimeout(() => build(), 2000);
      }
    })
    .catch((error) => {
      printGradient(`Failed to fetch remote file | ${error.message}`, [255, 207, 207], [255, 59, 59], 30);
    });
}

function calculateMd5(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(data).digest('hex');
}

const remoteUrl = 'https://raw.githubusercontent.com/cryst1e/RobloxScripts/main/main.js';
const localFilePath = 'main.js';

console.clear();

const Updater = `
██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗██████╗ 
██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗  ██████╔╝
██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝  ██╔══██╗
╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗██║  ██║
 ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`;
const maxLineLength = Math.max(...Updater.split('\n').map((line) => line.trim().length));
const gradientSteps = Updater.trim().split('\n')[0].length - 1;
const rInc = (0 - 160) / gradientSteps;
const gInc = (130 - 190) / gradientSteps;
const bInc = (180 - 220) / gradientSteps;

Updater.split('\n').forEach((line) => {
  let coloredLine = ' '.repeat(31);
  for (let i = 0; i < line.length; i++) {
    const r = Math.floor(160 + rInc * i);
    const g = Math.floor(190 + gInc * i);
    const b = Math.floor(220 + bInc * i);
    const colorCode = `\x1b[38;2;${r};${g};${b}m`;
    coloredLine += `${colorCode}${line[i]}`;
  }
  console.log(coloredLine + '\x1b[0m');
});

printGradient(`Current Script Version: ${ScriptVersion}`, [255, 255, 224], [255, 255, 0], 47);
setTimeout(() => {
  printGradient('Checking For Updates', [255, 255, 224], [255, 255, 0], 49);
  setTimeout(() => updateFile(remoteUrl, localFilePath), 1000);
}, 2000);
