let schizophrenia_level = 0;

function increase_schizophrenia(inc_amount){
    schizophrenia_level += inc_amount;
    console.log(`your schizophrenia level has increased by ${amount}.`);
    status_check();
}

function decrease_schizophrenia(dec_amount){
    schizophrenia_level += dec_amount;
    console.log(`Your schizophrenia level has decreased by ${dec_amount}`);
    status_check();
}

function status_check(){
    if(schizophrenia_level > 100){
        console.log('You are dying. You should have taken your meds or visited the hospital. Too late now.');
        //activate death scene from shizophrenia
    } else if (schizophrenia_level >= 90 && schizophrenia_level <= 100){
        console.log('You are very close to dying, go to a hospital immediately.');
        //activates whatever extreme hallucination happens at shizo 90-100
    } else if (schizophrenia_level >= 75 && schizophrenia_level < 90){ //activates when schizo level is getting dangerous
        console.log('Your schizophrenia level is pretty high, you should go to a hospital or take your meds soon.');
        // activates whatever hallucination happens between 75-89 schizo level
    } else if (schizophrenia_level >= 50 && schizophrenia_level < 75){
        console.log('Your schizophrenia level is getting kinda high, you should probably take your meds soon');
        // activates whatever small hallucination happens
    } else if (schizophrenia_level === 0){
        console.log('You are now temporarily cured of schizophrenia.')
    }
}

function take_meds(){
    schizophrenia_level -= 10;
    console.log('Your schizophrenia level has decreased by 10.');
}

function visit_hospital(){
    schizophrenia_level = 0;
    console.log('Your schizophrenia level is now 0.')
    status_check();
}

function sleep(){
    schizophrenia_level -= 5;
    console.log('Your schizophrenia level has decreased by 5 due to sleep.');
    
}
