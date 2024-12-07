import { TBookData, testData } from "@/constants/guidelines"

export type SampleBookdata = {
    fromLanguage: string,
    toLanguage: string, 
    originalBookData: TBookData,
    translatedBookData: TBookData
}


export const TranslatorSampleData: SampleBookdata[] = [
    {
        fromLanguage: "English",
        toLanguage: "German",
        originalBookData: {
            ...testData[0]
        },
        // @ts-ignore
        translatedBookData: {
            "title": "Spooky Cutie: Malbuch für Erwachsene und Jugendliche mit entzückend gruseligen Kreaturen in gemütlichen Hygge-Momenten zur Entspannung (Gemütliche Räume zum Ausmalen)",
            "description": "Seltsam und gemütlich! Eine eigenartige Welt voller mystischer, doch gemütlicher und liebenswerter Kreaturen. Störe sie nicht, sie sind tief in ihren skurrilen Stimmungen. Leg los, trage deine Farben sanft auf und lass den Spaß beginnen! Dieses Buch bietet: 40 handgezeichnete Seiten zum Ausmalen, super süße und gruselige Malvorlagen zur Stressreduktion und Entspannung, einseitige Seiten, um Durchschlagen zu verhindern (wenn du Marker verwendest, denke daran, ein Schutzblatt hinter die Seite zu legen, die du gerade bemalst), ein handliches Format von 8,5 x 8,5 Zoll für einfache Handhabung, hochauflösende Drucke für klare, scharfe Bilder.",
            "author": "Coco Wyo",
            // @ts-ignore
            "keywords": [
                "Malbuch",
                "gruselig",
                "niedlich",
                "hygge",
                "Entspannung",
                "Stressabbau",
                "Erwachsene"
            ],
            "apluscontent": null,
            "contributors": null
        }
    },
{
    fromLanguage: "English",
    toLanguage: "Japanese",
    originalBookData: {
        ...testData[2]
    } ,
    // @ts-ignore
    translatedBookData: {
        "title": "グラフ用紙ノートブック 8.5 x 11 / 120ページ / 4x4：学校、工学、図面用のコンポジション演習帳 - インチ当たり4マスのグリッド紙",
        "description": "この素晴らしく頑丈なノートブックについて：\n120ページのグラフルール付き\n4x4 - インチあたり4マス\nページサイズは8.5x11インチ（約21.59 x 27.94 cm）\n学生、建築家、アーティスト、科学者に最適\n家庭、学校、大学、仕事での活動に最適\n大人も子供も使える\nマットカバーフィニッシュ\n素晴らしいギフトになる\nスケッチ、グラフ、グリッド、図面、落書き、リスト作成、書き込み、メモ取りに使用可能。ノートブック、ジャーナル、コンポジションブックまたは日記として使用できます。\n今すぐノートを手に入れよう",
        "author": "リンジー・クリスチャン",
        // @ts-ignore
        "keywords": [
            "グラフ用紙",
            "ノートブック",
            "コンポジション",
            "学校",
            "工学",
            "図面",
            "学生"
        ],
        "apluscontent": null,
        "contributors": null
    }
},

{
    fromLanguage: "English",
    toLanguage: "Italian",
    originalBookData: {
        ...testData[7]
    },
    // @ts-ignore
    translatedBookData:{
        "title": "Ti amo fino alla luna e ritorno",
        "description": "Mostra a tuo figlio quanto è forte il tuo amore in ogni minuto della giornata! Include una pagina di personalizzazione 'A' e 'Da', rendendo questo dolce libro a tavole un regalo ideale per baby shower, compleanni e nuovi genitori.\n\nIl sole sorge, e un orso e il suo cucciolo iniziano la loro giornata insieme. Si divertono nell'acqua, scalano montagne, osservano le luci colorate nel cielo scintillante e giocano con gli amici. Dimostrano il loro amore toccandosi il naso, inseguendosi e, naturalmente, abbracciandosi e coccolandosi prima di andare a letto.\n\n· Un libro dolce per bebè e bambini piccoli di età 0-3\n· Perfetto per la Festa della Mamma, la Festa del Papà, San Valentino, baby shower, compleanni e nuovi genitori\n· Include una pagina di personalizzazione 'A' e 'Da' all'inizio del libro, rendendo questo libro commovente un regalo ideale",
        "author": "Amelia Hepworth",
        // @ts-ignore
        "keywords": [
            "libro per bambini",
            "libro a tavole",
            "amore",
            "bebè",
            "bambino piccolo",
            "regalo",
            "genitori"
        ],
        "apluscontent": null,
        "contributors": "Tim Warnes"
    }
}

]
