export class game{
    constructor(gameid){
        this.gameid = gameid
        this.players = [];
    }

    addPlayer(name){
        this.players.push(name);
    }
}
