
let chatColorSwatch = document.querySelector('#chatColor');
        let userColorSwatch = document.querySelector('#userColor');
        let colors = [
            'slate-500',
            'neutral-500',
            'stone-500',
            'zinc-500',
            'purple-500',
            'fuchsia-500',
            'indigo-500',
            'sky-500',
            'red-500',
            'pink-500',
            'amber-500',
            'orange-500',
            'lime-500',
            'teal-500',
            'stone-950',
            'stone-50'];
        function colorChanger(type, color){
            let msgs = document.querySelectorAll('.message.' + type);
            console.log(msgs);
            msgs.forEach((m)=>{
                m.classList.forEach((c)=>{
                    if(c.includes('text-')) {m.classList.remove(c)}
                });
                m.classList.add('text-' + color);
                console.log(m)
            });
        }

        let prefs = JSON.parse(localStorage.getItem('prefs'));
        if(prefs == undefined){
            prefs = {userColor: colors[0], chatColor: colors[0]};
        }
        colorChanger('user', prefs.userColor);
        colorChanger('chat', prefs.chatColor);
        
        let changeUserColor = (e)=>{
            prefs.userColor = e.target.classList.value.split(' ').find(a=>a.includes('bg-')).substring(3);
            colorChanger('user', prefs.userColor);
            console.log('use');
            localStorage.setItem('prefs', JSON.stringify(prefs));
        }
        let changeChatColor = (e)=>{
            prefs.chatColor = e.target.classList.value.split(' ').find(a=>a.includes('bg-')).substring(3);
            colorChanger('chat', prefs.chatColor);
            localStorage.setItem('prefs', JSON.stringify(prefs));
        }
        for (let i = 0; i < 16; i++) {
            let colorSwatch = document.createElement('div');
            ['m-1', 'rounded-xl', 'w-5', 'h-5'].forEach(c => colorSwatch.classList.add(c));
            colorSwatch.classList.add('bg-' + colors[i]);
            colorSwatch.addEventListener('click', changeChatColor);
            chatColorSwatch.appendChild(colorSwatch);
        }
        for (let i = 0; i < 16; i++) {
            let colorSwatch = document.createElement('div');
            ['m-1', 'rounded-xl', 'w-5', 'h-5'].forEach(c => colorSwatch.classList.add(c));
            colorSwatch.classList.add('bg-' + colors[i]);
            colorSwatch.addEventListener('click', changeUserColor);
            userColorSwatch.appendChild(colorSwatch);
        }