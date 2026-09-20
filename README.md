Just a basic script i made in a day for the purpose of tracking my Earth Defense Force 4.1 completion, and porting it to a spreadsheet for better stats viewing

Incredibly large shoutouts to [FevGrave's EDF Save Editor](https://github.com/FevGrave/EDFSaveEditor), without this project i wouldn't have been able to get past the encryption lol

# Usage
As of now i haven't been bothered to make an exe, so you just need an up to date version of NodeJS and just run `node index.js` in your command line of choice

Currently only works for Windows, no need to place it near your EDF 4.1 folder as it should find it itself

The script will create `EDF41 Completion.csv` next to itself, it will also copy that same data to your clipboard so you can import the data whichever way you prefer

the output is formatted like so:

| Mission | Class     |Easy|Normal|Hard|Hardest|Inferno
|---------|-----------|----|------|----|-------|-------
|Mission X|Ranger     |1   |0     |0   |0      |0    
|         |Wing Diver |1   |1     |1   |1      |1
|         |Air Raider |1   |0     |1   |1      |0
|         |Fencer     |1   |1     |1   |0      |1

The script will only output the 0s and 1s here, but that's the format, i don't know if that makes sense but i'm not good at describing things
