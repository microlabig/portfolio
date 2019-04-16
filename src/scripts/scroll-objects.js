/*
    Для включения анимации отредактируйте файлы:
    1) ./scripts/scroll.js (добавление секций в switch case, sectionLength (общее число секций)
    2) ./style/blocks/opacityZero.pcss (для включения элемента в opacity 0)
    3) ./scripts/scrollObjects.js (список анимируемых объектов)
*/

export const animatedElements = [
    // section_1 hero
    [
        '.animated__s1-1', '.animated__s1-2',
        '.animated__s1-3', '.animated__s1-4'
    ],
    // section_2 about
    [
        '.animated__s2-1', '.animated__s2-2',
        '.description__name-welcome', '.description__title',
        '.description__name-about', '.description__block'
    ],
    // section_3 useful
    [
        '.useful__title', '.skills__content'//, '.skills__item'
    ],
    // section_4 work
    [
        '.work__title', '.slider__preview-block', //'.slider__tag-item',
        '.slider__work', '.slider__linkblock'
    ],
    // section_5 review
    [
        '.review__titlebox', '.review__block'
    ],
    // section_6 feedback
    [
        '.animated__s6-1', '.animated__s6-2', '.animated__s6-3', 
        '.form__row--textarea', '.animated__s6-4'
    ]
];