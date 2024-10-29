

const access_key = "CG-2Prw6ZvvkeBmBNbvdETVrgPt";
// const url = `https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=${access_key}` ;
const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr&precision=2&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
// const url = `https://api.coingecko.com/api/v3/coins/list`;



const explore = async (name,num)=>{

    try{
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=inr&precision=2&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);

        const data = await res.json();
        
        console.log(data[name]);

        // {inr: 4842644.25, inr_market_cap: 95674390119358.12, inr_24h_vol: 2245387795897.7295, inr_24h_change: -0.7109255110131464, last_updated_at: 1725258107}

        const main = data[name];

       

        const price  = document.querySelector(`#item${num} .price p`);
        price.innerText = `₹ ${formatNumber(main.inr)}`;

        const change  = document.querySelector(`#item${num} .change p`);
        const changebg  = document.querySelector(`#item${num} .change`);
        change.innerText = formatNumber(main.inr_24h_change);

        if(formatNumber(main.inr_24h_change)<0){
            change.style.color='red' ;
            changebg.style.background = 'linear-gradient(to right, rgba(255,123,123,0.5),rgba(0, 0, 0, 0))';
        }else{
            change.style.color='green' ;
            changebg.style.background = 'linear-gradient(to right, rgba(55, 255, 132,0.5),rgba(0, 0, 0, 0))';
        }

        const vol  = document.querySelector(`#item${num} .vol p`);
        vol.innerText =`₹ ${formatNumber(main.inr_24h_vol)}` ;

        const last  = document.querySelector(`#item${num} .last p`);
        last.innerHTML = `${new Date(main.last_updated_at * 1000).toLocaleDateString()} <br>
        ${new Date(main.last_updated_at * 1000).toLocaleTimeString()} `;

        const total  = document.querySelector(`#item${num} .total p`);
        total.innerText = `₹ ${formatNumber(main.inr_market_cap)}`;



        

        console.log()

    }catch(e){
        console.log(e);
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    explore("bitcoin",1);
    explore("ethereum",2);
    explore("solana",3);
    explore("ripple",4);
    explore("tether",5);
    explore("dogecoin",6);
    
});




function formatNumber(num) {
    if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + ' Cr'; // Crores
    } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + ' L'; // Lakhs
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + ' M'; // Millions
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + ' K'; // Thousands
    } else {
        return num.toFixed(2).toString(); // If the number is less than 1000, return it as it is
    }
}