# Barcode Attendance Management (BAM)


<div id="top"></div>


<br />
<div align="center">
  <a href="">
    <img src="/assets/yliam.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Barcode Attendance Management (BAM)</h3>
</div>

## Getting Started
 <img src="/assets/preview.png" alt="Logo" width="100%">

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/33yliam/barcode-attendance-management.git; cd barcode-attendance-management
   ```
2. Install Expo CLI and NPM packages
   ```sh
   npm install --global expo-cli; npm install
   ```
3. Start the app
   ```sh
   expo start
   ```
4. Install Expo Go
  <li>iOS: <a href='https://apps.apple.com/app/expo-go/id982107779'>https://apps.apple.com/app/expo-go/id982107779</a></li>
  <li>Android: <a href='https://play.google.com/store/apps/details?id=host.exp.exponent'>https://play.google.com/store/apps/details?id=host.exp.exponent</a></li>


## Usage

<li>Run the app</li>
<li>Add faculty</li>
<li>Assign courses to faculty</li>
<li>Generate barcode <a href='https://barcode.tec-it.com/en/Code128'>here</a></li>
<li>Mark attendance for course</li>
<li>View attendance</li>

<p>Configure the roll number pattern in Database.js (const config)</p>


## ToDo

- [ ] Check attendance using Barcode scanning
- [ ] Present attendance data on pie chart
- [ ] View attendance using calendar
- [ ] Implement a centralized NoSQL database like Google Firestore, or a <a href='https://www.33yliam.com/p/blockchainCrypto'>decentralized database like GUN</a>
