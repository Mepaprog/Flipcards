// // fetch('data.json')
// //   .then(response => response.json()) // Parses the JSON content
// //   .then(data => {
// //     console.log(data); // Use the JSON data here

//     console.log(Object.keys(data).length);

    
    function setUpSubject(){
        const menucon = document.createElement('div');
        menucon.classList.add('menu');
        menucon.classList.add('flex');
        menucon.classList.add('ver');
        document.querySelector('main').append(menucon);
        Object.keys(data).forEach(key => {
            // console.log(`Key: ${key}`);
            const button = document.createElement('button');
            button.textContent = key;
            menucon.append(button);
            document.querySelector('footer').innerHTML = '<h2>Choose Subject</h2>';
            subjectsButtonEvent(button, key);
        });
    }
    setUpSubject();

    function removeItems(){
        document.querySelectorAll('main>*').forEach(item=>{
            item.remove();
        });
        document.querySelectorAll('footer>*').forEach(item=>{
            item.remove();
        });
    }
    document.querySelector('header>button').addEventListener('click', (event)=>{
        removeItems();
        setUpSubject();
    });

    function subjectsButtonEvent(button, key){
        button.addEventListener('click', (event)=> {
            removeItems();
            setUpChapter(data[key]);   
        });
    }

    function setUpChapter(obj){
        const menucon = document.createElement('div');
        menucon.classList.add('menu');
        menucon.classList.add('flex');
        menucon.classList.add('ver');
        document.querySelector('main').append(menucon);
        const selectAll = document.createElement('button');
        const next = document.createElement('button');
        selectAll.id = 'selectAll';
        selectAll.textContent = 'Select All';
        next.textContent = 'Next';
        document.querySelector('footer').append(selectAll);
        document.querySelector('footer').append(next);
        selectAll.addEventListener('click', ()=>{
            handleSelect(true);
        });
        nextButton(next, obj);
        const chapters = Object.entries(obj);
        Object.keys(chapters).forEach(key => {
            const container = document.createElement("div");
            container.classList.add("chapter");
            const input = document.createElement("input");
            const button = document.createElement("button");
            input.type = "checkbox";
            input.id = key;
            button.textContent = chapters[key][0];
            container.append(input);
            container.append(button)
            menucon.append(container);
            chapterButtonEvent(button, key);
        });
    }

    function handleSelect(isbutton){
        let selAll = true;
        const inputs = document.querySelectorAll('.chapter > input');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (!input.checked) {
                selAll = false;
                break; 
            }
        }
        if(selAll){
            document.getElementById('selectAll').textContent = 'Unselect All';
        }else{
            document.getElementById('selectAll').textContent = 'Select All';
        }
        if(isbutton){
            if(selAll){
                inputs.forEach(input=>{
                    input.checked = false;
                });
                document.getElementById('selectAll').textContent = 'Select All';
            }else{
                inputs.forEach(input=>{
                    input.checked = true;
                });
                document.getElementById('selectAll').textContent = 'Unselect All';
            }
        }
    }

    function chapterButtonEvent(button, key){
        button.addEventListener('click', (event)=> {
            if(document.getElementById(key).checked){
                document.getElementById(key).checked = false;
            }else{
                document.getElementById(key).checked = true;
            }
            handleSelect(false);
        });
        button.parentNode.querySelector('input').addEventListener('click', ()=>{
            handleSelect(false);
        });
        
    }

    function nextButton(nextBttn, obj){
        nextBttn.addEventListener('click', ()=>{
            const resetBttn = document.createElement('button');
            const shuffleBttn = document.createElement('button');
            resetBttn.textContent = "RESET";
            shuffleBttn.textContent = "SHUFFLE";
            document.querySelector('footer').append(resetBttn);
            document.querySelector('footer').append(shuffleBttn);
            OriChaptersItem = {};
            document.querySelectorAll('.chapter > input').forEach(input=>{
                if(input.checked){
                    setUpChapterItems(input.id, obj);
                }
            });
            removeItems();
            ChaptersItem = OriChaptersItem;
            setUpItems();
        });
    }

    let OriChaptersItem = {};
    let ChaptersItem = {};
    function setUpChapterItems(id, obj){ 
        const chapters = Object.entries(obj);
        const [chapterKey, chapterValue] = chapters[id];
        
        Object.entries(chapterValue).forEach(([k, v]) => {
            OriChaptersItem[k] = v;
        });
    }

    function setUpItems(){
        const main = document.querySelector('main');
        Object.keys(ChaptersItem).forEach((key, index) => {
            const item = document.createElement('div');
            item.classList.add('item');
            const itemInner = '<div class="flip-card-inner"><div class="front"><p>'+((Object.keys(OriChaptersItem).indexOf(key))+1)+'</p><text>'+ChaptersItem[key]+'</text></div><div class="back"><text>'+key+'</text></div></div>';
            item.innerHTML = itemInner;
            main.append(item);
        });
        setUpFlip();
        resetButton();
        shuffleButton();
    }
    
    function resetButton(){
        const resetBttn = document.createElement('button');
        resetBttn.id = 'reset';
        resetBttn.textContent = "RESET";
        document.querySelector('footer').append(resetBttn);
        resetBttn.addEventListener('click', ()=>{
            ChaptersItem = OriChaptersItem;
            removeItems();
            setUpItems();
        });
    }

    function setUpFlip(){
        const items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                if(event.currentTarget.querySelector('.flip-card-inner').classList.contains('flip')){
                    const flipclass = event.currentTarget.querySelector('.flip');
                    flipclass.classList.remove('flip');
                }else{
                    event.currentTarget.querySelector('.flip-card-inner').classList.add('flip');
                }
            });
        });
    }

    function shuffleButton(){
        const shuffleBttn = document.createElement('button');
        shuffleBttn.id = 'shuffle';
        shuffleBttn.textContent = 'SHUFFLE';
        document.querySelector('footer').append(shuffleBttn);
        document.getElementById('shuffle').addEventListener('click', ()=>{
            ChaptersItem = shuffleObject(OriChaptersItem);
            removeItems();
            setUpItems();
        });
    }

    function shuffleObject(obj) {
        const entries = Object.entries(obj);
        for (let i = entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [entries[i], entries[j]] = [entries[j], entries[i]];
        }
        return Object.fromEntries(entries);
    }

// // })
// // .catch(error => {
// // console.error('Error loading the JSON file:', error);
// // });
