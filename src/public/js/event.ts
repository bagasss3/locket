// get semua event
let urlEvent = "/api/event"
const getAllEvent = async (urlEvent:any) => {
    const data = await fetch(urlEvent, {
      headers: {
        'x-api-key': 'joemama'
      },
      
    }).then((response) =>
    response.json()
    );
    console.log(data);
    
};
getAllEvent(urlEvent)