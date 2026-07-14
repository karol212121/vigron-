Render deploy notes

1) Men `render.yaml` faylini repo ildiziga qo‘ydim. Bu fayl Renderga servis yaratish yoki mavjud servisini yangilash uchun ishlaydi.

2) Agar siz meni avtomatik deploy qilishga ruxsat berishni xohlasangiz, Render account API key (`service key`) yuboring — men key bilan repo'ni bog‘lab, deploy trigger qilaman.

3) Agar API key bermoqchi bo‘lmasangiz, quyidagilarni qiling:
   - Render dashboardga kiring -> Services -> New -> Connect repository
   - GitHub repositoriyangizni tanlang: `karol212121/vigron-`
   - `render.yaml` fayli mavjud bo‘lgani uchun Render avtomatik servis sozlamalarini ko‘radi va deploy qiladi.

4) Agar siz menga API key yuborsangiz, deploy tugagach tokenni o‘chirib yuborishingizni so‘rayman.
