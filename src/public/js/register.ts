var link = <HTMLInputElement>document.getElementById('registerParticipantBtn');
link.addEventListener('click', login);

async function register() {
  try {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const phoneNumber = (<HTMLInputElement>document.getElementById('no-phone'))
      .value;
    const birthDate = (<HTMLInputElement>(
      document.getElementById('tanggal-lahir')
    )).value;
    const gender = (<HTMLInputElement>document.getElementById('gender')).value;
    const status = (<HTMLInputElement>document.getElementById('status')).value;
    const password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    const repassword = (<HTMLInputElement>document.getElementById('password-2'))
      .value;
  } catch (err) {}
}
