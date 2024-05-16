export async function getCallApi({ url }:any) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      // Render the closest `error.js` Error Boundary
      throw new Error('Something went wrong!');
    }
    const result = await res.json();
  
    return result;
  }

export async function postCallApi( url:any, data:any) {
    console.log({url,data});

    const res = await fetch(`${url}`,{method:'POST',body:data});
    if (!res.ok) {
      // Render the closest `error.js` Error Boundary
      throw new Error('Something went wrong!');
    }
    const result = await res.json();
  
    return result;
  }