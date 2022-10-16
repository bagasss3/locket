import { Request, Response } from 'express';

export class RenderController {
  constructor() {
    this.index = this.index.bind(this);
    this.event = this.event.bind(this);
    this.detail_event = this.detail_event.bind(this);
    this.my_event = this.my_event.bind(this);
    this.login = this.login.bind(this);
    this.lupa_pass_1 = this.lupa_pass_1.bind(this);
    this.lupa_pass_2 = this.lupa_pass_2.bind(this);
    this.new_pass_1 = this.new_pass_1.bind(this);
    this.register = this.register.bind(this);
    this.register_participant = this.register_participant.bind(this);
    this.register_eo = this.register_eo.bind(this);
    this.register_verifikasi = this.register_verifikasi.bind(this);
    this.verifikasi_ulang = this.verifikasi_ulang.bind(this);
    this.verifikasi_sukses = this.verifikasi_sukses.bind(this);
  }

  async index(req: Request, res: Response) {
    return res.render('index');
  }
  async event(req: Request, res: Response) {
    return res.render('event');
  }
  async detail_event(req: Request, res: Response) {
    return res.render('detail-event');
  }
  async my_event(req: Request, res: Response) {
    return res.render('my-event');
  }
  async login(req: Request, res: Response) {
    return res.render('login');
  }
  async lupa_pass_1(req: Request, res: Response) {
    return res.render('lupa-pass-1');
  }
  async lupa_pass_2(req: Request, res: Response) {
    return res.render('lupa-pass-2');
  }
  async new_pass_1(req: Request, res: Response) {
    return res.render('new-pass-1');
  }
  async new_pass_2(req: Request, res: Response) {
    return res.render('new-pass-2');
  }
  async register(req: Request, res: Response) {
    return res.render('register');
  }
  async register_participant(req: Request, res: Response) {
    return res.render('register-participant');
  }
  async register_eo(req: Request, res: Response) {
    return res.render('register-eo');
  }
  async register_verifikasi(req: Request, res: Response) {
    return res.render('register-verifikasi');
  }
  async verifikasi_ulang(req: Request, res: Response) {
    return res.render('register-verifikasi-2');
  }
  async verifikasi_sukses(req: Request, res: Response) {
    return res.render('verifikasi-sukses');
  }
}
