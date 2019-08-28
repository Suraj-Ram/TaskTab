var settings = loadSettings()

function loadSettings() {
    let settings = JSON.parse( localStorage.getItem('settings') )

    // First time use
    if(settings) {
        return settings
    }
    else {
        return firstSettings
    }
}

function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings))
}

function handleBgChange(color1, color2) {
    changeBg(color1, color2)
    settings.background = [color1, color2]
    saveSettings()
}

function changeBg(color1, color2) {
    const colors = {
        aqua:    '#7fdbff',
        blue:    '#0074d9',
        lime:    '#01ff70',
        navy:    '#001f3f',
        teal:    '#39cccc',
        olive:   '#3d9970',
        green:   '#2ecc40',
        red:     '#ff4136',
        maroon:  '#85144b',
        orange:  '#ff851b',
        purple:  '#b10dc9',
        yellow:  '#ffdc00',
        fuchsia: '#f012be',
        gray:    '#aaaaaa',
        white:   '#ffffff',
        black:   '#111111',
        silver:  '#dddddd'
      };
    console.log(`Changing to gradient: ${color1}(${colors[color1]}) to ${color2}(${colors[color2]})`)

    document.body.style.background = `linear-gradient(90deg, ${colors[color1]}, ${colors[color2]})`
}

// Gradient on click handlers

const bgChangeNavyAqua = document.getElementById("bgChange-navy-aqua")
const bgChangeTealLime = document.getElementById("bgChange-teal-lime")
const bgChangeOrangeYellow = document.getElementById("bgChange-orange-yellow")
const bgChangeMaroonRed = document.getElementById("bgChange-maroon-red")
const bgChangeGraySilver = document.getElementById("bgChange-gray-silver")

bgChangeNavyAqua.addEventListener('click', () => handleBgChange('navy','aqua'))
bgChangeTealLime.addEventListener('click', () => handleBgChange('teal','lime'))
bgChangeOrangeYellow.addEventListener('click', () => handleBgChange('orange','yellow'))
bgChangeMaroonRed.addEventListener('click', () => handleBgChange('maroon','red'))
bgChangeGraySilver.addEventListener('click', () => handleBgChange('gray','silver'))
