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

    // ── Grammar data ────────────────────────────────────────────────────────────
    grammarData: [
        {
            type: 'mellekne', typeLabel: 'Melléknevek',
            title: 'Középfok (-abb/-ebb) és felsőfok (leg- + középfok)',
            icon: '📊',
            summary: 'Comparative and superlative — сравнительная и превосходная степень',
            explanation: 'A középfokot az -abb/-ebb képzővel alkotjuk (szép → szebb, nagy → nagyobb). A felsőfokot a leg- előtaggal és a középfokkal képezzük (leg + szebb = legszebb). Egyes mellékneveknél a tő is megváltozhat (jó → jobb, sok → több).',
            explanationRu: 'Сравнительная степень образуется суффиксом -abb/-ebb: szép → szebb (красивее), nagy → nagyobb (больше). Превосходная степень: приставка leg- + сравнительная степень: legszebb (самый красивый). Некоторые прилагательные имеют нерегулярные формы: jó → jobb (лучше), sok → több (больше).',
            examples: [
                { hu: 'nagy → nagy<b>obb</b>', ru: 'больший', note: 'mély hangrendű → -obb' },
                { hu: 'szép → sz<b>ebb</b>', ru: 'красивее', note: 'magas hangrendű, tőváltás: szép → szebb' },
                { hu: '<b>leg</b>sz<b>ebb</b> operaház', ru: 'самый красивый оперный театр', note: 'leg- + középfok = felsőfok' },
                { hu: 'Budapest <b>leg</b>nagyobb operaháza', ru: 'самый большой оперный театр Будапешта', note: 'felsőfok + birtok (-a)' }
            ],
            links: [
                { label: 'Comparative -bb — hungarianreference.com', url: 'http://www.hungarianreference.com/Adjectives/Comparative-bb.aspx' },
                { label: 'Superlative leg- — hungarianreference.com', url: 'http://www.hungarianreference.com/Adjectives/superlative-leg-bb.aspx' }
            ]
        },
        {
            type: 'eset', typeLabel: 'Esetragok',
            title: 'Delativus (-ról/-ről)',
            icon: '💬',
            summary: 'Felszínről való távolodás vagy téma — «с поверхности» или «о чём-то»',
            explanation: 'A delativus (-ról/-ről) két fő jelentést hordoz: (1) mozgás egy felszínről (lekerül a falról = снимают со стены), (2) téma, amiről szó van (az operáról mesél = рассказывает об опере). Az oroszban «о/об + предложный падеж» (téma) vagy «с + родительный падеж» (felszín) felel meg.',
            explanationRu: 'Делатив имеет два значения: (1) движение «с поверхности» (lekerül a falról — снимают со стены), (2) тема разговора или повествования (az operáról — об опере). Соответствует русскому «о/об + предложный» (тема) или «с + родительный» (поверхность). По вокальной гармонии: -ról (задн.), -ről (передн.).',
            examples: [
                { hu: 'az Operaház<b>ról</b> mesél', ru: 'рассказывает об Опере', note: 'téma → «о/об» + предл.' },
                { hu: 'Budapestr<b>ől</b> ír', ru: 'пишет о Будапеште', note: 'Budapest + -ről (magas hangrendű)' },
                { hu: 'a fal<b>ról</b> kerül le', ru: 'снимается со стены', note: 'felszín → «с + род.»' },
                { hu: 'az épületr<b>ől</b> szóló könyv', ru: 'книга о здании', note: 'jelzői szerep: «…ról szóló»' }
            ],
            links: [
                { label: 'Delative -ról/-ről — hungarianreference.com', url: 'http://www.hungarianreference.com/Nouns/r%C3%B3l-rol-delative.aspx' },
                { label: 'Hungarian case — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hungarian_case' }
            ]
        },
        {
            type: 'birtok', typeLabel: 'Birtok',
            title: '3. személyű birtok (-ja/-je / -a/-e)',
            icon: '🔑',
            summary: 'Harmadik személyű possesszív szuffixum — притяжательный суффикс 3 л.',
            explanation: 'A 3. személyű egyes szám possesszív szuffixum (-a/-e magánhangzóra végződő szavak után, -ja/-je mássalhangzó után) azt fejezi ki, hogy valami valakié: palotája = az ő palotája. Az oroszban «его/её» + főnév felel meg, a magyarban a szó maga kapja a ragot.',
            explanationRu: 'Притяжательный суффикс 3-го лица ед. ч. присоединяется к существительному: -a/-e (после гласных) или -ja/-je (после согласных). Значение: «его/её ... »: palotája — его дворец, neve — его имя. В русском это отдельное притяжательное местоимение, в венгерском — суффикс к существительному.',
            examples: [
                { hu: 'a palota → a palotá<b>ja</b>', ru: 'его дворец', note: 'palota (magánhangzóra végz.) → palotája' },
                { hu: 'az épület homlokzat<b>a</b>', ru: 'фасад здания', note: 'homlokzat (mássalhangzóra végz.) → -a' },
                { hu: 'a zenész hangszer<b>e</b>', ru: 'инструмент музыканта', note: 'hangszer (magas hangrendű) → -e' },
                { hu: 'az Operaház tervező<b>je</b>', ru: 'архитектор Оперного театра', note: 'tervező + -je (magánhangzó után)' }
            ],
            links: [
                { label: 'Possessive suffixes — hungarianreference.com', url: 'http://www.hungarianreference.com/Possession/SingleObjects.aspx' },
                { label: 'Hungarian grammar — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hungarian_grammar' }
            ]
        },
        {
            type: 'kepzo', typeLabel: 'Képzők',
            title: 'Deverbális főnévképző (-ás/-és)',
            icon: '🏗️',
            summary: 'Igéből főnév — отглагольное существительное',
            explanation: 'Az -ás/-és képző igékből főneveket alkot, amelyek a cselekvést mint folyamatot vagy eredményt jelölik. Hasonlít az orosz «-ание/-ение/-ние» képzőhöz. Magánhangzó-harmónia szerint: mély hangrendű igékhez -ás, magas hangrendűekhez -és járul.',
            explanationRu: 'Суффикс -ás/-és образует отглагольные существительные, обозначающие сам процесс или его результат. Близок к русским суффиксам «-ание/-ение/-ние/-ство»: строительство, открытие, выступление. По вокальной гармонии: -ás (задний ряд), -és (передний ряд).',
            examples: [
                { hu: 'épít → épít<b>és</b> / építkez<b>és</b>', ru: 'строительство', note: 'épít = строить; magas hangrendű → -és' },
                { hu: 'megnyit → megnyit<b>ás</b>', ru: 'открытие (церемония)', note: 'megnyit = открывать; mély → -ás' },
                { hu: 'előad → előad<b>ás</b>', ru: 'представление, выступление', note: 'előad = представлять; mély → -ás' },
                { hu: 'alkot → alkot<b>ás</b>', ru: 'творчество, произведение', note: 'alkot = творить; mély → -ás' }
            ],
            links: [
                { label: 'Hungarian grammar — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hungarian_grammar' }
            ]
        },
        {
            type: 'igekoto', typeLabel: 'Igekötők',
            title: 'Fel- igekötő (felemelkedés, megjelenés)',
            icon: '⬆️',
            summary: 'Felfelé irányuló mozgás vagy egy állapot megjelenése — приставка «вз-/вс-/вы-»',
            explanation: 'A fel- igekötő fő jelentései: (1) felemelkedés, felfelé irányuló mozgás (felmegy, felépít), (2) egy állapot, folyamat megjelenése vagy keletkezése (felvetődik egy kérdés, felépül egy épület). Az oroszban «вз-/вс-», «вы-» vagy «по-» lehet.',
            explanationRu: 'Приставка fel- имеет два основных значения: (1) движение вверх (felmegy — подниматься, felépít — построить/возвести), (2) возникновение, появление (felvetődik — возникает, felépül — построено, готово). Соответствует русск. «вз-/вс-», «вы-», «по-», «воз-».',
            examples: [
                { hu: 'épít → fel<b>épít</b>', ru: 'возвести, построить', note: 'épít = строить; fel + épít = воздвигнуть' },
                { hu: 'avatja → fel<b>avatja</b>', ru: 'открывает, освящает', note: 'felső regiszter: ünnepélyes megnyitó' },
                { hu: 'vetődik → fel<b>vetődik</b>', ru: 'возникает (о вопросе)', note: 'kérdés felvetődik = вопрос поднимается' },
                { hu: 'megy → fel<b>megy</b>', ru: 'подниматься (наверх)', note: 'megy = идти; fel + megy = идти наверх' }
            ],
            links: [
                { label: 'Verbal prefixes (fel-, el-, meg-...) — hungarianreference.com', url: 'http://www.hungarianreference.com/Verbs/verbal-prefixes-coverb-coverbs-meg-el-ki-le-be-fel.aspx' },
                { label: 'Hungarian grammar — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hungarian_grammar' }
            ]
        },
        {
            type: 'ige', typeLabel: 'Igék',
            title: 'Feltételes mód (-na/-ne / -ná/-né)',
            icon: '💭',
            summary: 'Feltételes vagy udvarias cselekvés — условное наклонение «бы»',
            explanation: 'A feltételes módot az -na/-ne (alanyi ragozás) és -ná/-né (tárgyas ragozás) képzőkkel alkotjuk. Kifejezi (1) feltételes cselekvést (szeretnék = хотел бы), (2) udvarias kérést (kérhetnék?), (3) irreális feltételt (ha lenne pénzem, elmennék). Megfelel az orosz «бы + múlt idő» szerkezetnek.',
            explanationRu: 'Условное наклонение образуется суффиксами -na/-ne (неопределённое спряжение) и -ná/-né (определённое спряжение). Используется: (1) для выражения желания (szeretnék — я хотел бы), (2) вежливых просьб, (3) нереальных условий (ha lenne — если бы было). Полностью соответствует русскому «глагол + бы».',
            examples: [
                { hu: 'szeret → szeretn<b>ék</b>', ru: 'я хотел бы', note: 'szeret + feltételes + 1. sz. → szeretnék' },
                { hu: 'lehet → lehet<b>ne</b>', ru: 'было бы возможно', note: 'lehet + -ne → lehetne (безличная форма)' },
                { hu: 'megy → men<b>nék</b>', ru: 'я бы пошёл', note: 'megy + feltételes → mennék (tőváltás)' },
                { hu: 'lát → látn<b>ám</b>', ru: 'я бы увидел (это)', note: 'tárgyas feltételes, 1. sz. → látném/látnám' }
            ],
            links: [
                { label: 'Conditional mood — hungarianreference.com', url: 'http://www.hungarianreference.com/Verbs/conditional-would-should.aspx' },
                { label: 'Hungarian grammar — Wikipedia', url: 'https://en.wikipedia.org/wiki/Hungarian_grammar' }
            ]
        }
    ],

    // ── Grammar quiz pool ───────────────────────────────────────────────────────
    grammarQuizPool: {
        choice: [
            {
                q: 'Hogyan képezzük a felsőfokot a magyarban?',
                a: 'leg- előtag + középfok (pl. legszebb)',
                wrong: ['leg- előtag + alapfok', '-abb/-ebb rag + leg utótag', 'a- előtag + alapfok']
            },
            {
                q: 'Mit fejez ki a delativus (-ról/-ről)?',
                a: 'Felszínről való távolodást vagy témát (pl. az operáról)',
                wrong: ['Valami felé való mozgást', 'Valamin belüli tartózkodást', 'Valakinek szóló adást']
            },
            {
                q: 'Mit jelent a »palotája« szóban a -ja rag?',
                a: 'A 3. személyű egyes szám birtok (az ő palotája)',
                wrong: ['A határozott névelő', 'Az akkuzatívusz jele', 'A többes szám jele']
            },
            {
                q: 'Melyik szó képzett főnév az »előad« igéből?',
                a: 'előadás',
                wrong: ['előadó', 'előadott', 'előadni']
            },
            {
                q: 'Mit fejez ki a feltételes mód a »szeretnék« szóban?',
                a: 'Vágyat vagy lehetőséget, ami nem biztos, hogy megvalósul',
                wrong: ['Jövő idejű cselekvést', 'Parancsot vagy felszólítást', 'Múltban befejezett cselekvést']
            }
        ],
        fill: [
            {
                sentence: 'Az Operaház Budapest leg___bb operaháza. (felsőfok: szép → szebb)',
                answer: 'szeb',
                hint: 'szép → szebb → legszebb: a tő megváltozik (szép → szeb-)'
            },
            {
                sentence: 'Az Operaház épülés___kor Ferenc József is jelen volt. (delativus: épülés)',
                answer: 'e',
                hint: 'épülés + -kor (időhatározó) → az épülés + -e (birtok) → épülésekor'
            },
            {
                sentence: 'Ha több pénzem lenne, minden előadást megnézn___k. (feltételes mód, 1. sz.)',
                answer: 'é',
                hint: 'megnéz + feltételes + tárgyas 1. sz. → megnézném'
            }
        ],
        order: [
            {
                words: ['Ybl', 'Miklós', 'tervezte', 'az', 'épületet'], ru: 'Миклош Ибл спроектировал здание',
                hint: 'Alany (Ybl Miklós) + tárgyas ige (tervezte) + határozott tárgy (az épületet)'
            },
            {
                words: ['Szeretnék', 'elmenni', 'az', 'operába'], ru: 'Я бы хотел сходить в оперу',
                hint: 'Feltételes mód (Szeretnék) + főnévi igenév (elmenni) + helyhatározó (az operába)'
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
