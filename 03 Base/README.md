# Результаты бенчмарков. В ops/sec
Числа в заголовках - размер массива/количество операций 

## Вставка

||В начало 100|В начало 1000|В начало 10000|Случ. 100|Случ. 1000|Случ. 10000|В конец 100|В конец 1000|В конец 10000|
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|SingleArray|127,372|708|6|102,931|714|6|125,667|725|5|
|VectorArray|202,683|1,525|14|211,159|2,376|24|675,359|6,296|57|
|FactorArray|175,907|1,743|15|230,454|3,013|35|1,163,133|140,792|6,643|
|MatrixArray|141,269|1,338|13|157,915|2,323|24|374,577|42,335|4,090|
|SpaceArray|94,387|4,969|470|128,892|5,892|392|293,098|14,648|1,312|
|SystemArray|236,353|15,214|191|188,053|15,889|388|1,526,744|204,986|22,759|
|TypedF64Array|178,948|16,507|193|152,847|18,049|399|248,688|78,020|8,193|

## Случайная вставка без роста (заранее алоцируется массив требуемого размера)

||100|1000|10000|
|---|---:|---:|---:|
|VectorArray|244,404|5,370|52|
|FactorArray|234,298|5,380|52|
|MatrixArray|154,031|3,289|36|
|SystemArray|168,693|7,804|71|
|TypedF64Array|228,191|20,542|407|

## Чтение

||100|1000|10000|
|---|---:|---:|---:|
|SingleArray|1,084,788|106,729|9,934|
|VectorArray|1,107,340|106,959|9,938|
|FactorArray|1,108,523|105,111|9,827|
|MatrixArray|627,352|57,627|5,981|
|SpaceArray|650,500|21,775|410|
|SystemArray|1,105,792|103,751|9,782|
|TypedF64Array|1,146,203|107,605|10,304|

## Случайное удаление

||100|1000|10000|
|---|---:|---:|---:|
|SingleArray|103,841|1,505|14|
|VectorArray|154,066|1,616|15|
|FactorArray|150,353|1,636|16|
|MatrixArray|137,829|1,181|12|
|SpaceArray|88,669|10,439|1,101|
|SystemArray|112,398|3,491|146|
|TypedF64Array|250,120|12,789|164|

# Выводы

Главный вывод - js неподходящий язык для таких экспериментов. Почти
всегда встроенные массивы значительно быстрее ручных реализаций.
Причины:
- Нет функции для переноса элементов между массивами, приходится
  переносить по одному
- В V8 нежелательно создавать массивы ненулевого размера, так как в этом
  случае создается разряженный массив с соответствующей
  производительностью. Лучше создать пустой массив и наполнять его,
  добавляя элементы в конец.

В большинстве тестов наилучшую производительность показывает FactorArray
(с двухкратным увеличением памяти на каждом шаге роста).
 
Если в массиве хранятся числа, то лучше использовать аналог FactorArray
построенный на базе TypedArray. Он почти всегда быстрее FactorArray,
кроме добавления элемента в конец относительно небольшого массива.
Непонятно почему.

SpaceArray на порядок-два быстрее всех остальных на удалении элементов
из большого массива, но при этом на порядок медленнее всех на чтении из
этого же массива. Если есть алгоритмы, где нужно много удалять, но не
читать, то он оказывается наилучшим выбором.
