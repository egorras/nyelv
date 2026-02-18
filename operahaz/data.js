// Quiz and flashcard data
window.APP_DATA = {
    title: 'Az Operaház',
    titleRu: 'История Оперного театра',
    badge: 'Építészeti remekmű',
    footerHref: 'https://opera.hu',
    footerLabel: 'opera.hu',
    theme: 'azure',
    category: 'architecture',

    // ── Story: bilingual blocks ──────────────────────────────────────────────
    storyData: [
        {
            act: 'Történet',
            scenes: [
                {
                    scene: '1. Az épület története',
                    blocks: [
                        {
                            hu: 'Ybl Miklós neoreneszánsz palotája több mint százharminc éve várja az opera és a balett szerelmeseit.',
                            ru: 'Неоренессансный дворец Миклоша Ибла уже более ста тридцати лет ждёт любителей оперы и балета.',
                            pairs: [['palotája', 'дворец'], ['százharminc', 'ста тридцати'], ['várja', 'ждёт'], ['szerelmeseit', 'любителей']],
                            vocab: [['palota', 'дворец'], ['szerelem', 'любовь/любитель'], ['vár', 'ждать']],
                            note: '💡 <b>palotája</b> = его дворец: <i>palota</i> + <i>-ja</i> (притяж. суффикс).</div><div class="vocab-note">💡 <b>szerelmeseit</b> = его любителей: от <i>szerelmes</i> (влюблённый).'
                        },
                        {
                            hu: 'Az épületbe évente több ezer turista is ellátogat, hogy megcsodálja Budapest egyik legjelentősebb műemlékét.',
                            ru: 'Ежегодно здание посещают тысячи туристов, чтобы полюбоваться одним из самых значимых памятников Будапешта.',
                            pairs: [['épületbe', 'здание'], ['évente', 'ежегодно'], ['ellátogat', 'посещают'], ['megcsodálja', 'полюбоваться'], ['műemlékét', 'памятников']],
                            vocab: [['épület', 'здание'], ['évente', 'ежегодно'], ['műemlék', 'памятник архитектуры']],
                            note: '💡 <b>-be/-ba</b> — иллатив (внутрь): <i>épület<b>be</b></i> = в здание.</div><div class="vocab-note">💡 <b>legjelentősebb</b> = самый значимый: <i>leg-</i> (самый) + <i>jelentős</i> (значимый) + <i>-ebb</i>.'
                        }
                    ]
                },
                {
                    scene: '2. Az építkezés szükségszerűsége',
                    blocks: [
                        {
                            hu: 'Az Andrássy út kiépítésével felvetődött egy önálló operaház létrejöttének gondolata is.',
                            ru: 'С застройкой проспекта Андраши возникла идея создания отдельного оперного театра.',
                            pairs: [['kiépítésével', 'застройкой'], ['felvetődött', 'возникла'], ['önálló', 'отдельного'], ['gondolata', 'идея']],
                            vocab: [['út', 'путь/проспект'], ['gondolat', 'мысль/идея'], ['létrejött', 'создание']],
                            note: '💡 <b>-val/-vel</b> — инструменталис: <i>kiépítésé<b>vel</b></i> = с застройкой.</div><div class="vocab-note">💡 <b>felvetődött</b> = возникла/была выдвинута.'
                        },
                        {
                            hu: 'Akkoriban a Nemzeti Színház már nem tudott eleget tenni az operajátszás követelményeinek.',
                            ru: 'В то время Национальный театр уже не мог соответствовать требованиям оперных постановок.',
                            pairs: [['akkoriban', 'то время'], ['nem tudott', 'не мог'], ['eleget tenni', 'соответствовать'], ['követelményeinek', 'требованиям']],
                            vocab: [['színház', 'театр'], ['követelmény', 'требование'], ['játszás', 'игра/постановка']],
                            note: '💡 <b>eleget tesz</b> = удовлетворять/соответствовать: устойчивое выражение.</div><div class="vocab-note">💡 <b>nem tudott</b> = не мог (прош. вр.).'
                        }
                    ]
                },
                {
                    scene: '3. A pályázat és az építés',
                    blocks: [
                        {
                            hu: 'A tervpályázatot Ybl Miklós nyerte meg, akinek pályaművét a zsűri nagy többséggel fogadta el.',
                            ru: 'Конкурс проектов выиграл Миклош Ибл, чью работу жюри приняло подавляющим большинством.',
                            pairs: [['tervpályázatot', 'конкурс'], ['nyerte meg', 'выиграл'], ['pályaművét', 'работу'], ['többséggel', 'большинством']],
                            vocab: [['terv', 'план/проект'], ['nyer', 'выигрывать'], ['zsűri', 'жюри']],
                            note: '💡 <b>megnyer</b> = выиграть: приставка <i>meg-</i> придаёт завершённость.</div><div class="vocab-note">💡 <b>pályamű</b> = конкурсная работа.'
                        },
                        {
                            hu: 'Fontos kitétel volt, hogy a kivitelezést magyar mesterek végezzék, és az anyagok is Magyarországról származhatnak.',
                            ru: 'Важным условием было то, что строительство должны вести венгерские мастера, а материалы — происходить из Венгрии.',
                            pairs: [['fontos', 'важным'], ['kitétel', 'условием'], ['kivitelezést', 'строительство'], ['mesterek', 'мастера'], ['származhatnak', 'происходить']],
                            vocab: [['mester', 'мастер'], ['anyag', 'материал'], ['származik', 'происходить']],
                            note: '💡 <b>-ról/-ről</b> — делатив (с/из): <i>Magyarország<b>ról</b></i> = из Венгрии (с территории).</div><div class="vocab-note">💡 <b>végezzék</b> = выполняли (сослагательное наклонение).'
                        },
                        {
                            hu: 'Ybl Miklós teljesítette a kérést, bár a márványburkolatok Carrarából, a gránitoszlopok pedig Ausztriából érkeztek.',
                            ru: 'Миклош Ибл выполнил просьбу, хотя мраморная облицовка была доставлена из Каррары, а гранитные колонны — из Австрии.',
                            pairs: [['teljesítette', 'выполнил'], ['márványburkolatok', 'облицовка'], ['gránitoszlopok', 'колонны'], ['érkeztek', 'доставлены']],
                            vocab: [['teljesít', 'выполнять'], ['burkolat', 'облицовка'], ['oszlop', 'колонна']],
                            note: '💡 <b>bár</b> = хотя. Существовали технические исключения для материалов, которые нельзя было найти в Венгрии.'
                        }
                    ]
                },
                {
                    scene: '4. I. Ferenc József kikötése',
                    blocks: [
                        {
                            hu: 'A császár azzal a feltétellel engedélyezte az építést, ha a pesti ház nem lesz nagyobb a bécsinél.',
                            ru: 'Император разрешил строительство при условии, что пештский театр не будет больше венского.',
                            pairs: [['császár', 'император'], ['feltétellel', 'условии'], ['engedélyezte', 'разрешил'], ['nagyobb', 'больше'], ['bécsinél', 'венского']],
                            vocab: [['császár', 'император'], ['feltétel', 'условие'], ['nagyobb', 'больше']],
                            note: '💡 <b>-nál/-nél</b> — при сравнении: <i>bécsi<b>nél</b></i> = чем венский.</div><div class="vocab-note">💡 <b>engedélyezte</b> = разрешил (прош. вр. определ. спряж.).'
                        },
                        {
                            hu: 'Ybl ezért elhagyta a legfelső emeletet, és ezzel az épület arányosabb lett.',
                            ru: 'Поэтому Ибл отказался от верхнего этажа, и благодаря этому здание стало более пропорциональным.',
                            pairs: [['ezért', 'поэтому'], ['elhagyta', 'отказался'], ['legfelső', 'верхнего'], ['arányosabb', 'пропорциональным']],
                            vocab: [['elhagy', 'оставлять/бросать'], ['emelet', 'этаж'], ['arányos', 'пропорциональный']],
                            note: '💡 <b>elhagyta</b> = оставил/убрал. <b>arányosabb</b>: <i>arányos</i> + <i>-abb</i> (сравн. степень).'
                        }
                    ]
                },
                {
                    scene: '5. A megnyitó',
                    blocks: [
                        {
                            hu: 'A megnyitó előadásra 1884. szeptember 27-én került sor, amelyen maga a császár is részt vett.',
                            ru: 'Церемония открытия состоялась 27 сентября 1884 года, в ней принял участие сам император.',
                            pairs: [['megnyitó', 'открытия'], ['került sor', 'состоялась'], ['császár', 'император'], ['részt vett', 'принял участие']],
                            vocab: [['előadás', 'представление'], ['részt vesz', 'принимать участие']],
                            note: '💡 <b>sor kerül valamire</b> = доходит очередь до чего-то / происходит действие.</div><div class="vocab-note">💡 <b>részt vett</b> = участвовал (прош. вр. от <i>részt vesz</i>).'
                        },
                        {
                            hu: 'A megnyitót óriási érdeklődés övezte, a belépőjegyek ára akkoriban két ló árával vetekedett.',
                            ru: 'Открытие вызвало огромный интерес, в то время цены на входные билеты соперничали со стоимостью двух лошадей.',
                            pairs: [['érdeklődés', 'интерес'], ['övezte', 'вызвало'], ['belépőjegyek', 'билеты'], ['vetekedett', 'соперничали']],
                            vocab: [['érdeklődés', 'интерес'], ['belépőjegy', 'входной билет'], ['ló', 'лошадь']],
                            note: '💡 <b>vetekedett</b> = соперничал/соревновался. Подчеркивает невероятно высокую стоимость билетов.'
                        }
                    ]
                }
            ]
        }
    ],

    // ── Quiz pool ──────────────────────────────────────────────────────────────
    quizPool: {
        choice: [
            {
                q: 'Ki volt az Operaház építésze?',
                opts: ['Steindl Imre', 'Ybl Miklós', 'Pollack Mihály', 'Eiffel Gusztáv'], correct: 1,
                hint: 'Ő tervezte a Várkert Bazárt is.'
            },
            {
                q: 'Milyen stílusban épült a palota?',
                opts: ['Gótikus', 'Barokk', 'Neoreneszánsz', 'Szecessziós'], correct: 2,
                hint: 'Az olasz reneszánsz újjászületése.'
            },
            {
                q: 'Mit jelent a „műemlék” szó?',
                opts: ['музей / museum', 'памятник архитектуры / monument', 'театр / theater', 'дворец / palace'], correct: 1,
                hint: 'Mű (произведение) + emlék (память).'
            },
            {
                q: 'Ki engedélyezte az építkezést?',
                opts: ['Kossuth Lajos', 'I. Ferenc József', 'Szent István', 'Horthy Miklós'], correct: 1,
                hint: 'Az osztrák császár og magyar király.'
            }
        ],
        fill: [
            {
                sentence: 'Az Operaház neoreneszánsz ___ épült.', blank: 'stílusban', distractors: ['házban', 'kertben', 'utcán'],
                hint: 'В каком стиле? (stílus + -ban).'
            },
            {
                sentence: 'A zsűri nagy ___ fogadta el Ybl tervét.', blank: 'többséggel', distractors: ['örömmel', 'sebességgel', 'tömeggel'],
                hint: 'Большинством голосов (többség + -vel).'
            },
            {
                sentence: 'Fontos volt, hogy ___ mesterek dolgozzanak.', blank: 'magyar', distractors: ['német', 'olasz', 'osztrák'],
                hint: 'A hazai ipar támogatása volt a cél.'
            }
        ],
        order: [
            {
                words: ['Ybl', 'Miklós', 'tervezte', 'az', 'épületet'], ru: 'Миклош Ибл спроектировал здание',
                hint: 'Alany + Állítmány + Tárgy.'
            },
            {
                words: ['A', 'császár', 'részt', 'vett', 'a', 'megnyitón'], ru: 'Император принял участие в открытии',
                hint: 'Részt vesz (принимать участие) — igekötős kifejezés.'
            }
        ]
    },

    // ── Anki flashcard deck ────────────────────────────────────────────────────
    ankiDeck: [
        { hu: 'palota', pos: 'főnév', ru: 'дворец', en: 'palace', ex: 'Az Operaház egy neoreneszánsz palota.' },
        { hu: 'műemlék', pos: 'főnév', ru: 'памятник архитектуры', en: 'monument', ex: 'Budapest egyik legszebb műemléke.' },
        { hu: 'építkezés', pos: 'főnév', ru: 'строительство', en: 'construction', ex: 'Az építkezés kilenc évig tartott.' },
        { hu: 'terv', pos: 'főnév', ru: 'план/проект', en: 'plan/design', ex: 'Ybl Miklós terve nyert.' },
        { hu: 'anyag', pos: 'főnév', ru: 'материал', en: 'material', ex: 'Csak magyar anyagokat használtak.' },
        { hu: 'császár', pos: 'főnév', ru: 'император', en: 'emperor', ex: 'A császár is ott volt a bálon.' },
        { hu: 'engedély', pos: 'főnév', ru: 'разрешение', en: 'permission', ex: 'Az uralkodó adta meg az engedélyt.' },
        { hu: 'márvány', pos: 'főnév', ru: 'мрамор', en: 'marble', ex: 'A lépcsőház márványból készült.' },
        { hu: 'csillár', pos: 'főnév', ru: 'люстра', en: 'chandelier', ex: 'A hatalmas csillár Mainzban készült.' },
        { hu: 'megnyitó', pos: 'főnév/mn', ru: 'открытие', en: 'opening', ex: 'A megnyitó előadás sikeres volt.' }
    ]
};
