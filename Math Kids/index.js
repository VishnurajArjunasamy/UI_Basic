//shapes object
const shapes = [
    {
        'id': 0,
        'name': "Circle",
        'class': 'circle',
        'input': '2. Enter Radius',
        'side': ['RADIUS', 'r', 'cm'],
        'area': ['AREA', '&pi;r&#178;', 'sq cm'],
        'perimeter': ['PERIMETER', '2&pi;r', 'cm'],
        calculation: (value) => {
            localStorage.setItem('side', (value) + " " + shapes[0].side[2]);
            localStorage.setItem('area', (3.141 * value * value).toFixed(2) + " " + shapes[0].area[2]);
            localStorage.setItem('perimeter', (2 * 3.141 * value).toFixed(2) + " " + shapes[0].perimeter[2]);
        }
    },
    {
        'id': 1,
        'name': 'Equilateral Triangle',
        'class': 'triangle',
        'input': '2. Enter Side (Base & Height)',
        'side': ['SIDE', 's', 'cm'],
        'area': ['AREA', '0.433 * s * s', 'sq cm'],
        'perimeter': ['PERIMETER', '3 * s', 'cm'],
        calculation: (value) => {
            localStorage.setItem('side', (value) + " " + shapes[1].side[2]);
            localStorage.setItem('area', (0.433 * value * value).toFixed(2) + " " + shapes[1].area[2]);
            localStorage.setItem('perimeter', (3 * value) + " " + shapes[1].perimeter[2]);
        }
    },
    {
        'id': 2,
        'name': 'Square',
        'class': 'square',
        'input': '2. Enter Side',
        'side': ['SIDE', 's', 'cm'],
        'area': ['AREA', 's * s', 'sq cm'],
        'perimeter': ['PERIMETER', '4 * s', 'cm'],
        calculation: (value) => {
            localStorage.setItem('side', (value) + " " + shapes[2].side[2])
            localStorage.setItem('area', (value * value) + " " + shapes[2].area[2]);
            localStorage.setItem('perimeter', 4 * value + " " + shapes[2].perimeter[2]);
        }
    },
]

let selectedShape = ''
let selectedElement = ''
let shapeIndex;
const startSection = document.querySelector('.start-section')
const lastSection = document.querySelector('.last-section')
const midSection = document.querySelector(".mid-section")
const shapeContainer = document.querySelector('#shapes')
const nextBtn = document.querySelector('.next')
const tick = document.querySelectorAll('.fa')

shapeContainer.addEventListener('click', (event) => {
    selectedShape = event.target.className
    //selected shape index
    for (let shape of shapes) {
        if (shape.class == selectedShape) shapeIndex = shape.id
    }
    selectedElement = document.querySelector('.' + shapes[shapeIndex].class)

    //toggle tick
    tick.forEach(element => element.style.display = 'none');
    tick[shapeIndex].style.display='block'
    nextBtn.style.display = 'block'
})

//event for next button
nextBtn.addEventListener('click', () => {
    document.querySelector('.start-section').style.display = 'none'

    //section 2
    //text box
    let txt_div = document.createElement('div')
    txt_div.setAttribute('class', 'page2-top txt')
    txt_div.append(shapes[shapeIndex].input)
    midSection.append(txt_div)
    //input box
    let input_box = document.createElement('input')
    input_box.setAttribute('class', 'page2-mid')
    input_box.setAttribute('type', 'number')
    midSection.append(input_box)
    //calculate button
    let cal_btn = document.createElement('button')
    cal_btn.setAttribute('class', 'button')
    cal_btn.append('CALCULATE')
    cal_btn.style.display = 'block';
    midSection.append(cal_btn)

    // Event for calculation button
    cal_btn.addEventListener('click', () => {
        let input_value = input_box.value;
        if (!input_value) {
            alert('Enter a value!')
        }
        else {
            //performing calculation
            shapes[shapeIndex].calculation(input_value)

            //section 3
            //clearing content
            midSection.innerHTML = '';

            //shape box
            let shape_show = document.createElement('div')
            shape_show.setAttribute('class', shapes[shapeIndex].class)
            lastSection.append(shape_show)
            //txt box
            let shape_name = document.createElement("div");
            shape_name.setAttribute('class', 'txt')
            shape_name.append(shapes[shapeIndex].name);
            lastSection.append(shape_name)
            //calculation table
            let calculation_table = document.createElement('div');
            calculation_table.setAttribute('class', 'cal-table')
            for (let key of ['side', 'area', 'perimeter']) {
                for (let i = 0; i < 3; i++) {
                    let cell = document.createElement('div')
                    if (i == 2) cell.innerHTML = localStorage.getItem(key)
                    else cell.innerHTML = shapes[shapeIndex][key][i];
                    calculation_table.append(cell);
                }
            }
            
            lastSection.append(calculation_table)

            //start again button
            let startagain_btn = document.createElement('button');
            startagain_btn.setAttribute('class', 'button');
            startagain_btn.append('START AGAIN');
            startagain_btn.style.display = 'block';
            lastSection.append(startagain_btn)

            //start again event
            startagain_btn.addEventListener('click', () => {
                //clearing container
                lastSection.innerHTML = '';
                //clearing local storage
                localStorage.clear();
                //Reverting to first section
                document.querySelector('.start-section').style.display = 'flex';
                tick[shapeIndex].style.display='none' 
                nextBtn.style.display = 'none'
            })
        }
    })
})

