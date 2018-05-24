//PODVRHNUTA VERZE KNIHOVNY MOMENT
//protoze moment() nam porad vraci aktualni datum a cas, tak by po kazdem snapshot testu vyskocila chyba, ze to nesouhlasi s predchozim snapshotem protoze aktualni cas je jiny nez pri predchozim snapshot testu
//proto se vytvori funkce, ktera udela:
//kdyz narazis na moment s parametrem tak pouzij ten parametr, kdyz narazis na moment bez parametru moment() tak misto aktualniho casu pouzij 0


//nejde klasicky import bo ten by naimportoval tu podvrzenou verzi
const moment = require.requireActual("moment");

export default (timestamp = 0) => {
    return moment(timestamp);
};