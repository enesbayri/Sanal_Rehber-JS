

class Kisi{
    constructor(ad,soyad,mail){
        this.ad=ad;
        this.soyad=soyad;
        this.mail=mail;
    }
}

class Ekran{
    constructor(){
        this.formAd=document.querySelector('.form-ad');
        this.formSoyad=document.querySelector('.form-soyad');
        this.formMail=document.querySelector('.form-mail');

        this.rehberekleBtn=document.querySelector('.rehber-ekle').addEventListener('click',this.rehberEkle.bind(this));

        this.rehberDetay=document.querySelector('.rehber-detay');
        this.rehberDetay.addEventListener('click',this.rehberDuzenleSil.bind(this));

        this.depo= new Depo();
        this.KisileriEkranaEkle();

        

    }

    rehberEkle(e){
        e.preventDefault();
        const kisi=new Kisi(this.formAd.value,this.formSoyad.value,this.formMail.value);
        if(document.querySelector('.edit')!=null){
            const editlenen=document.querySelector('.edit');
            const eskiKisi= new Kisi(editlenen.children[0].innerText,editlenen.children[1].innerText,editlenen.children[2].innerText);
            this.depo.localStorageDuzenle(eskiKisi,kisi);
        }else{
            //this.kisiyiEkranaEkle(kisi);
            this.depo.localStorageEkle(kisi);
        }
        document.location.reload(true);
    }

    rehberDuzenleSil(e){

        //e.preventDefault();
        const tiklanilan=e.target;

        let silinecekKisi={};
        let duzenlenecekKisi={};

        if(tiklanilan.classList.contains('btn--delete')){
            let td;
            td=tiklanilan.parentElement.parentElement;
            silinecekKisi={
                ad:td.children[0].innerText,
                soyad:td.children[1].innerText,
                mail:td.children[2].innerText,
            }
            this.depo.localStorageSil(silinecekKisi);
            document.location.reload(true);
        }else if(tiklanilan.classList.contains('fa-trash-alt')){
            let td;
            td=tiklanilan.parentElement.parentElement.parentElement;
            silinecekKisi={
                ad:td.children[0].innerText,
                soyad:td.children[1].innerText,
                mail:td.children[2].innerText,
            }
            this.depo.localStorageSil(silinecekKisi);
            document.location.reload(true);
        }
        else if(tiklanilan.classList.contains('btn--edit')){
            let td;
            td=tiklanilan.parentElement.parentElement;
            duzenlenecekKisi={
                ad:td.children[0].innerText,
                soyad:td.children[1].innerText,
                mail:td.children[2].innerText,
            }
            if(document.querySelector('.edit') && !td.classList.contains('edit')){
                let edit=document.querySelector('.edit');
                edit.classList.toggle('edit');
            }
            td.classList.toggle('edit');
        }else if(tiklanilan.parentElement.classList.contains('btn--edit')){
            let td;
            td=tiklanilan.parentElement.parentElement.parentElement;
            duzenlenecekKisi={
                ad:td.children[0].innerText,
                soyad:td.children[1].innerText,
                mail:td.children[2].innerText,
            }
            if(document.querySelector('.edit') && !td.classList.contains('edit')){
                let edit=document.querySelector('.edit');
                edit.classList.toggle('edit');
            }
            td.classList.toggle('edit');
        }
        if(document.querySelector('.edit')!=null){
            const editlenen=document.querySelector('.edit');
            const eskiKisi=new Kisi(this.formAd.value,this.formSoyad.value,this.formMail.value);
            this.formAd.value=editlenen.children[0].innerText;
            this.formSoyad.value=editlenen.children[1].innerText;
            this.formMail.value=editlenen.children[2].innerText;
            
        }

        //this.depo.localStorageDuzenle(duzenlenecekKisi);
        //document.location.reload(true);

    



    }



    kisiyiEkranaEkle(kisi){
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

        this.rehberDetay.appendChild(rehberTr);
    }

    KisileriEkranaEkle(){
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        });
    }
}

class Depo{
    constructor(){
        this.tumKisiler=this.localStorageOku();
    }

    localStorageOku(){
        let kisiler;
        if(localStorage.getItem('kisiler')===null){
            kisiler=[];
        }else{
            kisiler=JSON.parse(localStorage.getItem('kisiler'));
        }
        return kisiler;
    }
    localStorageEkle(kisi){
        let tumKisiler=this.localStorageOku();
        tumKisiler.push(kisi);

        localStorage.setItem('kisiler',JSON.stringify(tumKisiler));
    }

    localStorageSil(silinecekKisi){
        let tumKisiler=this.localStorageOku();
        let yeniKisiler;
        let silinen;
        yeniKisiler=tumKisiler.filter(function(kisi){
            if(kisi.ad===silinecekKisi.ad && kisi.soyad=== silinecekKisi.soyad && kisi.mail===silinecekKisi.mail){
                silinen=kisi;
            }else{
                return kisi;
            }
        });
        
        localStorage.setItem('kisiler',JSON.stringify(yeniKisiler));

    }

    localStorageDuzenle(eskiKisi,yeniKisi){
        let tumKisiler=this.localStorageOku();
        let yeniKisiler=tumKisiler.filter(function(kisi){
            if(kisi.ad===eskiKisi.ad && kisi.soyad=== eskiKisi.soyad && kisi.mail===eskiKisi.mail){
                kisi.ad=yeniKisi.ad;
                kisi.soyad=yeniKisi.soyad;
                kisi.mail=yeniKisi.mail;
            }
            return kisi;
            
        });
        
        localStorage.setItem('kisiler',JSON.stringify(yeniKisiler));
    }
}

document.addEventListener('DOMContentLoaded',function(){
    const ekran=new Ekran();
});