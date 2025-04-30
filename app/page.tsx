import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, BarChart3, UserCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Aýlygynyzy Hasaplaň
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Kompaniýalar we erkin işçiler üçin aýlyk kesintilerini hasaplamagyň iň aňsat usuly.
                    Salgyt, pensiýa we ätiýaçlandyryş boýunça takyk çaklamalary derrew alyň.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Başlaň
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="gap-1">
                      Ulgama Giriň
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto grid max-w-[400px] gap-6 lg:max-w-none lg:grid-cols-1">
                <div className="flex flex-col gap-1 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calculator className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Kompaniýalar Üçin</h3>
                      <p className="text-sm text-muted-foreground">
                        Işgärleriň aýlyklaryny we kesintilerini dolandyryň
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserCircle className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Erkin Işçiler Üçin</h3>
                      <p className="text-sm text-muted-foreground">
                        Özbaşdak işleýänler üçin kesintileri hasaplaň
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BarChart3 className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Detallaýyn Bölünişik</h3>
                      <p className="text-sm text-muted-foreground">
                        Bütün kesintilerden doly hasabatlara seredip bilersiňiz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}