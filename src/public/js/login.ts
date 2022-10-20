var link = <HTMLInputElement>document.getElementById('loginBtn');
link.addEventListener('click', login);

async function login() {
  try {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    console.log(email, password);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'joemama',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data.data);
    if (data.data.access_token) {
      console.log('Setting up Cookies');
      document.cookie = 'access_token=' + data.data.access_token + '; Secure';
      document.cookie = 'refresh_token=' + data.data.refresh_token + '; Secure';
    }
    console.log(document.cookie);
  } catch (err) {
    console.log(err);
  }
}
