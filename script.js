// fetch('data.json')
//   .then(response => response.json()) // Parses the JSON content
//   .then(data => {
//     console.log(data); // Use the JSON data here

    console.log(Object.keys(data).length);

    const menucon = document.querySelector('.menu');
    Object.keys(data).forEach(key => {
        console.log(`Key: ${key}`);
        const button = document.createElement('button');
        button.textContent = key;
        menucon.append(button)
    });

    const menubuttons = document.querySelectorAll('.menu>button');
    
    let topicOriginalShorting
    let topic
    menubuttons.forEach((button) => {
        button.addEventListener('click', (event)=> {
            document.querySelector('.menu').remove();
            topicOriginalShorting = data[button.textContent];
            topic = topicOriginalShorting;
            setUpItems();
            setUpFlip();
        });
    });
    

    function setUpItems(){
        if(topic){
            const main = document.querySelector('main');
            Object.keys(topic).forEach((key, index) => {
                const item = document.createElement('div');
                item.classList.add('item');
                const itemInner = '<div class="flip-card-inner"><div class="front"><p>'+((Object.keys(topicOriginalShorting).indexOf(key))+1)+'</p><text>'+key+'</text></div><div class="back"><text>'+topic[key]+'</text></div></div>';
                item.innerHTML = itemInner;
                main.append(item);
            });
        }
    }
    function removeItems(){
        document.querySelectorAll('.item').forEach(item=>{
            item.remove();
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

    function shuffleObject(obj) {
        const entries = Object.entries(obj);
        for (let i = entries.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [entries[i], entries[j]] = [entries[j], entries[i]];
        }
        return Object.fromEntries(entries);
      }
      
    
    document.getElementById('reset').addEventListener('click', ()=>{
        if(topic){
            topic = topicOriginalShorting;
            removeItems();
            setUpItems();
            setUpFlip();
        }
    });
    
    document.getElementById('shuffle').addEventListener('click', ()=>{
        if(topic){
            topic = shuffleObject(topic);
            removeItems();
            setUpItems();
            setUpFlip();
        }
    });

// })
// .catch(error => {
// console.error('Error loading the JSON file:', error);
// });
