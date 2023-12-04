

yeniad=document.querySelector('.form-ad');
yenisoyad=document.querySelector('.form-soyad');
yenimail=document.querySelector('.form-mail');

rehberekleBtn=document.querySelector('.rehber-ekle');
rehberDetay=document.querySelector('.rehber-detay');

islemBasarili=document.querySelector('.bilgi--success');
islemHatali=document.querySelector('.bilgi--error');

rehberekleBtn.addEventListener('click',rehberEkle);

rehberDetay.addEventListener('click',rehberSilDuzenle);


document.addEventListener('DOMContentLoaded',localStorageOku);


function rehberEkle(e){
    if(document.querySelector('.edit')!=null){
        const editlenenObje=document.querySelector('.edit');
        let editsizObje={
            ad:editlenenObje.children[0].innerText,
            soyad:editlenenObje.children[1].innerText,
            mail:editlenenObje.children[2].innerText,
        }
        let editliObje={
            ad:yeniad.value,
            soyad:yenisoyad.value,
            mail:yenimail.value,
        }
        editlenenObje.children[0].innerText=yeniad.value;
        editlenenObje.children[1].innerText=yenisoyad.value;
        editlenenObje.children[2].innerText=yenimail.value;

       localStorageEdit(editliObje,editsizObje);

       islemBasarili.classList.toggle('bilgi--success');
       islemBasarili.classList.toggle('bilgi--edit');
       islemBasarili.innerText='Kişi Başarıyla Güncellendi!'
       islemBasarili.classList.toggle('gizle')
        editlenenObje.classList.toggle('edit');
        setTimeout(function(){
            window.location.reload(1);
           }, 750);
    


    }
    else if(yeniad.value!="" && yenisoyad.value!="" && yenimail.value!=""){
        let yeniRehber={
            ad:yeniad.value,
            soyad:yenisoyad.value,
            mail:yenimail.value
        };
        localStorageEkle(yeniRehber);
        islemBasarili.classList.toggle('gizle');
        
        setTimeout(function(){
            window.location.reload(1);
           }, 750);
        

        

       

    }
    else{
        alert("BOŞ GÖREV GİRİŞİ YAPILAMAZ");
        
    }

    
    
    
}
function localStorageEdit(editlenen,eskiObje){
    let kisiler=JSON.parse(localStorage.getItem('kisiler'));
    let editliKisiler=kisiler.filter(function(kisi){
        if(kisi.ad===eskiObje.ad && kisi.soyad===eskiObje.soyad && kisi.mail===eskiObje.mail){
            kisi.ad=editlenen.ad;
            kisi.soyad=editlenen.soyad;
            kisi.mail=editlenen.mail
        }
        return kisi;
        
    });
    localStorage.setItem('kisiler',JSON.stringify(editliKisiler));

}

function rehberTabloyaEkle(kisi){
    
    const rehberTr=document.createElement('tr');

    const tdAd=document.createElement('td');
    tdAd.innerText=kisi.ad;
    rehberTr.appendChild(tdAd);

    const tdSoyad=document.createElement('td');
    tdSoyad.innerText=kisi.soyad;
    rehberTr.appendChild(tdSoyad);

    const tdMail=document.createElement('td');
    tdMail.innerText=kisi.mail;
    rehberTr.appendChild(tdMail);

    const tdEdit=document.createElement('td');
    const tdEditbtn=document.createElement('button');
    tdEditbtn.classList.add('btn');
    tdEditbtn.classList.add('btn--edit');
    tdEditbtn.innerHTML='<i class="fa-regular fa-pen-to-square"></i>';
    tdEdit.appendChild(tdEditbtn);
    rehberTr.appendChild(tdEdit);

    const tddelete=document.createElement('td');
    const tddeletebtn=document.createElement('button');
    tddeletebtn.classList.add('btn');
    tddeletebtn.classList.add('btn--delete');
    tddeletebtn.innerHTML='<i class="fa-solid fa-trash-alt"></i>';
    tddelete.appendChild(tddeletebtn);
    rehberTr.appendChild(tddelete);

    rehberDetay.appendChild(rehberTr);


}

function localStorageOku(e){
    let kisiler;
    if(localStorage.getItem('kisiler')===null){
        kisiler=[];
    }
    else{
        kisiler=JSON.parse(localStorage.getItem('kisiler'));
    }
    kisiler.forEach(function(kisi){
        rehberTabloyaEkle(kisi);
    });

}

function localStorageEkle(kisi){
    let kisiler;
    if(localStorage.getItem('kisiler')===null){
        kisiler=[];
    }
    else{
        kisiler=JSON.parse(localStorage.getItem('kisiler'));
    }

    kisiler.push(kisi);

    localStorage.setItem('kisiler',JSON.stringify(kisiler));

   

}
function localStorageSil(silinecekObje){
    let silinenKisi;
    let kisiler=JSON.parse(localStorage.getItem('kisiler'));
    let yeniKisiler=kisiler.filter(function(kisi){
        if(kisi.ad===silinecekObje.ad && kisi.soyad===silinecekObje.soyad && kisi.mail===silinecekObje.mail){
            silinenKisi=kisi;
        }else{
            return kisi;
        }
        
    });


    localStorage.setItem('kisiler',JSON.stringify(yeniKisiler));
    islemBasarili.innerText='Seçilen kişi silinmiştir!'+' -> '+silinenKisi.ad+' '+silinenKisi.soyad+' '+silinenKisi.mail;
    islemBasarili.classList.toggle('gizle');

    
    
}

function rehberSilDuzenle(e){
    const tiklanilanEleman=e.target;
    let silinecekObje;
    if(tiklanilanEleman.parentElement.classList.contains('btn--delete')){
        const tiklanilan=tiklanilanEleman.parentElement.parentElement.parentElement;
        silinecekObje={
            ad:tiklanilan.children[0].innerText,
            soyad:tiklanilan.children[1].innerText,
            mail:tiklanilan.children[2].innerText,
        }
        localStorageSil(silinecekObje);
        tiklanilanEleman.parentElement.parentElement.classList.toggle('kaybol');
        document.location.reload(true);
       
    }else if(tiklanilanEleman.classList.contains('btn--delete')){
        const tiklanilan=tiklanilanEleman.parentElement.parentElement;
        silinecekObje={
            ad:tiklanilan.children[0].innerText,
            soyad:tiklanilan.children[1].innerText,
            mail:tiklanilan.children[2].innerText,
        }
        localStorageSil(silinecekObje);

        tiklanilanEleman.parentElement.parentElement.classList.toggle('kaybol');

        document.location.reload(true);
        
    }
    else if(tiklanilanEleman.parentElement.classList.contains('btn--edit')){
        const tiklanilan=tiklanilanEleman.parentElement.parentElement.parentElement;
        editObje={
            ad:tiklanilan.children[0].innerText,
            soyad:tiklanilan.children[1].innerText,
            mail:tiklanilan.children[2].innerText,
        }
        yeniad.value=editObje.ad
        yenisoyad.value=editObje.soyad
        yenimail.value=editObje.mail
        if(tiklanilan.parentElement.querySelector('.edit')){
            tiklanilan.parentElement.querySelector('.edit').classList.toggle('edit');
        }
        tiklanilan.classList.toggle('edit');
        
    }
    else if(tiklanilanEleman.classList.contains('btn--edit')){
        const tiklanilan=tiklanilanEleman.parentElement.parentElement;
        editObje={
            ad:tiklanilan.children[0].innerText,
            soyad:tiklanilan.children[1].innerText,
            mail:tiklanilan.children[2].innerText,
        }
        yeniad.value=editObje.ad
        yenisoyad.value=editObje.soyad
        yenimail.value=editObje.mail
        if(tiklanilan.parentElement.querySelector('.edit')){
            tiklanilan.parentElement.querySelector('.edit').classList.toggle('edit');
        }
        tiklanilan.classList.toggle('edit');
        
    }

    
}