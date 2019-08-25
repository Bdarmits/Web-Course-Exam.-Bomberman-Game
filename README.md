# (Оновлення) Другий етап виконання завдання.
## Звіт по поставлених цілях ( завдання що потрібно було виконати до другого етапу описани нижче у 1 і 2 етапах реалізації):

### Поле гри та елементи меню:

Усі основні завдання було виконано. Прототип поля для гри спочатку створений статично, тепер генерується випадковим чином, хоча самі правила генерації потрібно вдосконалити щоб могти в подальшому створювати різні рівні складності гри не повторюючи розміщення елементів на полі. Однак перший прототип рандому на карті присудній. Створений прототип меню гравця, який в наступних етапах розробки буде заповнений контентом, він вміщає всі обіцяні частини, кількість яких в майбітньому може збільшитись. В першому етапі було обіцяно створити відділ в меню де гравець зможе бачити усі свої бонуси та їх кількість. Місце для цього елементу є відведеним однак через те, що усі бонуси будуть розроблені в наступних етапах, воно поки пусте. Дизайн покищо в початковому вигляді і в наступних етапах буде змінений. Самі елементи на карті, як і було заплановано існують двох видів, ті - які знищуються від вибуху та ті - які не знищуються.

### Механіка Гравця та NPC:

З цієї частини були виконані усі заплановані пункти. Було реалізовано елементи через які неможливо пройти. Механіка переміщення гравця, працює досконало. NPC поки переміщуються за принципом рандому, на кожному свому кроці випадковим чином вибирається напрямок руху. Ця механіка доволі стандартна для ігор типу бомбермена, однак в подільшому планується детальніше продумати її. Початкова логіка появлення NPC "зомбі" на карті також була зроблена лише для тестування гри і в подальшому після створення кращої генерації рівнів, буде перероблена щоб відповідати кожному з них. Взаємодія NPC з гравцем : коли гравець пересікається з "зомбі" він програє, це також було виконано.

### Бомби:

Механіку бомб повністю реалізомано. Бомби знищують гравця, NPC, та стіни які піддаються вибуху. 

##Усі подальші плани описано нижче в пунктах "Третій етап реалізації" та "Четвертий етап реалізації", окрім того планується зробити певні доробки: 

 > Зробити гарнішу анімацію вибуху, яка працюватиме як в класичному бомбермені, або реалізувати свій кращий варіант.
 
 > Доробити механіку руху NPC
 
 > Доопрацювати генерацію рівнів

№№ Всі доробки відносяться до четвертого етапу розробки гри (Описано нижче)

###########################################################################################
# Перший етап виконання завдання
# Завдання для перездачі з курсу “Веб технології і веб дизайн”
# Виконавець - Богдан Дарміць.

# Тема проекту:
Для перездачі я обрав завдання реалізувати гру [Bomberman](https://en.wikipedia.org/wiki/Bomberman).

Використовуючи лише html, css, js без сторонніх бібліотек, створити свій браузерний аналог гри Bomberman. Сама гра є стратегією-	лабіринтом, у якій гравцю потрібно грати за аватара який шукаючи вихід з лабіринту змушений підривати стіни за допомогою бомб, 		долати монстрів, що намагаються знищити гравця та здобувати різноманітні бонуси під знищеними стінами. Усе це для того, щоб 		здобути заповітний ключ, та відчинити собі вихід на волю.
	
# Розбиття проекту (тривалість  15серпня – 5вересня):

## 1.Перший етап реалізації (15серпня – 20серпня):

### Карта та елементи меню:

Початково карта генеруватиметься статично, щоб на ній можна було випробовувати різноманітні елементи гри. 

Буде зроблено:

 > елементарний, початковий дизайн сторінки гри.
 
 > дизайн елементів гри.
 
 > прототип меню, що включатиме в себе такі пункти як “how to play”, та інші...
 
 > статистика за матч, глобальна статистика з можливістю її скинути.
 
 > можливо також інші додаткові пункти.
			
На додачу до  меню буде ще також елемент сторінки де гравець зможе побачити кількість своїх бомб та отриманих бонусів.	

### Аватар гравця та механіка руху:

Аватар гравця матиме можливість пересуватись у чотири сторони та ставити бомби. 
		
### Стіни:

Елементи стіни будуть реалізовані у двох варіантах блоків – блоки що піддаються вибуху та блоки що не піддаються. Блоки 		що піддаються вибуху буде що можливо знищити бомбою, ті що не піддаються - витримуватимуть силу вибуху. Блоки 				відрізнятимуться візуальною.

Також буде реалізовано властивість стін та інших елементів карти не пропускати аватара крізь себе.
		
### Бомби та механіка вибуху:

Буде реалізовано сам прототип вибуху, бомба, радіус вибуху, кількість бомб у гравця, часові рамки вибуху.
Як уже згадувалось вище, аватар матиме можливість поставити бомбу. Бомба ставитиметься на місці розташування гравця, та підриватиме такі елементи гри як:

 > сам гравець.
 
 > NPC.
 
 > стіни що піддаються вибуху.
 
Вибух буде реалізовано за допомогою анімації. Всі елементи гри що попадуть у зону дії вибуху будуть знищені, за умови якщо вони піддаються впливу вибуху.

## 2.Другий етап реалізації (20серпня – 25 серпня):

### Випадкова генерація карти:

Для подальшого дизайну рівнів буде реалізовано можливість генерувати рівні випадковим чином але з певними загальними правилами розташування елементів на карті. 

### NPC, взаємодія з гравцем:

 > Буде реалізовано початковий дизайн NPC, так званих “Зомбі”. Вони полюють за гравцем щоб не дати йому подолати рівень.
 
 > Буде розроблено механізм добавляння  зомбі на карту. Кількість можна буде легко регулювати однією змінною в коді. 
 
 > Буде розроблено логіку зміни сили зомбі та їх кількості залежно від рівня гри.
 
 > А також буде розроблено логіку появи зомбі на карті, тобто на якій відстані один від одного, на якій відстані від гравця, як далеко від виходу з лабіринту, і тд...

### Механіка руху NPC:

Буде реалізовано механіку руху зомбі включаючи заборону проходити крізь об’єкти на карті, і що основне, сам принцип автоматичного переміщення NPC по карті.

## 3.Третій етап реалізації (25серпня – 30серпня):

### Кілька видів бонусів та механіка їх роботи:

Бонуси це ще одна механіка гри, їх можна буде знайти під тими типами стін, що знищуються. 

Буде реалізовано бонусів буде кількох видів які додаватимуть:
 > додаткові бомби
 
 > імунітет до зомбі
 
 > можливість телепортуватись
 
Бонуси будуть детально продумані і можливо змінені під-час розробки, також вони будуть збалансовані в залежності від складності рівнів та під саму гру.

### Генерація ключа та логіки виходу з лабіринту:

Буде реалізовано елемент гри – Ключ. Ключ знаходитиметься або під одною з знищувальних стін або просто як елемент на карті. Підібравши Ключ гравець можливо отримуватиме певні “дебафи” – зниження вмінь та характеристик. З цим ключем Аватару буде потрібно дійти до виходу з лабіринту. Саме це необхідно для того, щоб завершити рівень і перейти на наступний.

### Лічильники:

В грі будуть реалізовані лічильники:

 > Лічильник бомб
 
 >  Каунтер смертей
 
 > Каунтер вбивств
 
 > Каунтер пройдених кімнат
 
Усі лічильники будуть рахувати статистику гравця за гру, а також, глобальну статистику. Це дозволить декільком гравцям змагатись між собою, та покращувати результат проходження гри. Можливо в процесі розробки добавляться інші елементи статистики.

## 4.Четвертий етап реалізації (30серпня – 5вересня):

### Баг фіксінг:

На цьому етапі буде проведено фінальний рефакторінг коду, де будуть виправлені ключові недоліки а також реалізовано необхідні покращення. Буде проведено фінальний контроль якості продукту.

### Декорації, стилістика гри:

Добавлю гарні текстури для елементів гри.

### Звукові ефекти:

Буде реалізовано звукові ефекти ходьби, вибуху бомби, фонова музика, та інші...

### Фінальне Доопрацювання:

На цьому етапі все ще раз буде перевірено для фінальної презентації.

# До другого етапу звіту, будуть реалізовані перші дві частини.
# В процесі реалізації гри можливі зміни у вищенаведеному технічному описі продукту для покращення його стабільності та привабливості для гравців.
