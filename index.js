const crypto = require('node:crypto')
const fs = require('node:fs')
const { Buffer } = require('node:buffer')
const os = require('node:os')

const userpath = os.homedir()
const edfpath = "/Documents/My Games/EDF4.1/SAVE_DATA/76561198253683478/saveslot00"
const onlineSave = "/DEFP_M01.MST"

//https://github.com/FevGrave/EDFSaveEditor/blob/main/EDFSaveEditorSave_Handler.py#L24
const _EDF41_KEY = Buffer.from("DBD394C9E09C52CE77467D6A9F913C81", 'hex')
const _EDF41_IV = Buffer.from("F5A9402744EE8C270B2E6D97A9C430CA", 'hex')

const RangerOffset = 0x20;
const WingDiverOffset = 0x220;
const AirRaiderOffset = 0x420;
const FencerOffset = 0x620;
const endOffset = 0x820;



fs.readFile(userpath + edfpath + onlineSave, 'hex', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        onlineSaveFile = data;
        decrypt(data, _EDF41_IV, _EDF41_KEY)
    }
});


//https://www.w3schools.com/nodejs/nodejs_crypto.asp
function decrypt(data, iv, key) {
    const decipher = crypto.createDecipheriv(
        'AES-128-CTR',
        key,
        Buffer.from(iv, 'hex')
    );

    let decrypted = decipher.update(data, 'hex', 'hex');
    decrypted += decipher.final('hex')

    makeCSV(Buffer.from(decrypted, 'hex'))
}

function makeCSV(data) {
    const rangerData = data.slice(RangerOffset, WingDiverOffset);
    const wingDiverData = data.slice(WingDiverOffset, AirRaiderOffset);
    const airRaiderData = data.slice(AirRaiderOffset, FencerOffset);
    const fencerData = data.slice(FencerOffset, endOffset);
    let csv = '';

    for (i = 0; i < 98; i++) {
        let line;
        rComp = rangerData[i].toString(2)
        rComp = rComp.padStart(5, "0")
        rComp = rComp[4] + '\t' + rComp[3] + '\t' + rComp[2] + '\t' + rComp[1] + '\t' + rComp[0] + '\n' // i got lazy lol

        wComp = wingDiverData[i].toString(2)
        wComp = wComp.padStart(5, "0")
        wComp = wComp[4] + '\t' + wComp[3] + '\t' + wComp[2] + '\t' + wComp[1] + '\t' + wComp[0] + '\n'

        aComp = airRaiderData[i].toString(2)
        aComp = aComp.padStart(5, "0")
        aComp = aComp[4] + '\t' + aComp[3] + '\t' + aComp[2] + '\t' + aComp[1] + '\t' + aComp[0] + '\n'

        fComp = fencerData[i].toString(2)
        fComp = fComp.padStart(5, "0")
        fComp = fComp[4] + '\t' + fComp[3] + '\t' + fComp[2] + '\t' + fComp[1] + '\t' + fComp[0] + '\n'

        line = rComp + wComp + aComp + fComp;
        csv += line

    }

    fs.writeFile('EDF41 Completion.csv', 'utf8', (err, data) => { })

    require('child_process').spawn('clip').stdin.end(csv);

}