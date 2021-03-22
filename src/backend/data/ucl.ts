import { PotData } from "../types";
import { bayern, dortmund, leipzig, bayerLev } from "./bundesLiga";
import { manCity, liverpool, chelsea, manUtd, tottenham } from "./epl";
import { porto, ajax, galatasaray, benfica, cska, shakhtar, zenith, olympiacos, salzburg, brugge, psv } from "./europeRest";
import { realMadrid, barcelona, atleticoMadrid, sevilla } from "./laLiga";
import { psg, lyon, marseille } from "./ligueOne";
import { juventus, inter, milan, napoli, roma } from "./serieA";

export const UCLDefaulPots: PotData = {
    pot1: [
        realMadrid,
        bayern,
        barcelona,
        psg,
        manCity,
        liverpool,
        juventus,
        porto
    ],
    pot2: [
        chelsea,
        atleticoMadrid,
        dortmund,
        inter,
        manUtd,
        ajax,
        milan,
        lyon
    ],
    pot3: [
        tottenham,
        galatasaray,
        napoli,
        sevilla,
        benfica,
        marseille,
        cska,
        leipzig
    ],
    pot4: [
        shakhtar,
        zenith,
        olympiacos,
        bayerLev,
        roma,
        salzburg,
        brugge,
        psv
    ]
};