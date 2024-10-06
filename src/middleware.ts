import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getMe } from "./app/authutils";

export async function middleware(request: NextRequest) {
  const AUTH_PAGES = [
    { url: "/ustawienia/createUser", admin: true },
    { url: "/statystyki", admin: false },
    { url: "/ustawienia", admin: false },
    { url: "/ustawienia/wiadomoscDoAnimatora", admin: false },
    { url: "/ustawienia/zmienHaslo", admin: false },
    { url: "/informacje", admin: false },
    { url: "/materialy", admin: false },
    { url: "/listaMinistrantow", admin: false },
    { url: "/ranking", admin: false },
  ];

  const authPage = AUTH_PAGES.find((authPageUrl) =>
    request.nextUrl.pathname.startsWith(authPageUrl.url)
  );

  if (authPage) {
    const user = await getMe();

    if (!user) {
      return NextResponse.redirect(new URL("/zaloguj", request.url));
    }

    if (authPage.admin && !user.admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
