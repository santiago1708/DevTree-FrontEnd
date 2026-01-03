import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
    return (
        <>
            <Header />
            <main className="bg-gray-100 py-10 min-h-screen lg:bg-home bg-right-top bg-no-repeat lg:bg-home-xl">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todas tus <span className="text-cyan-400">Redes Sociales </span>
                            en un enlace
                        </h1>
                        <p className="text-slate-800 text-xl font-semibold">
                            Únete a mas de 200 mll developers compartiendo sus redes sociales, comparte tu perfil de 
                            Tiktok, Facebook, Instagram, Linkedin, Twitter, Github y mas en un solo enlace.
                        </p>

                        <SearchForm />
                    </div>
                </div>
            </main>
        </>
    )
}
