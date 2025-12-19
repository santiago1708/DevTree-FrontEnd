import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import type { SocialNetwork, User } from "../types"

export default function LinkTreeView() {

    const [devTreeLinks, setDevTreeLinks] = useState(social)
    const queryClient = useQueryClient();
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Links actualizados correctamente')
        }
    })

    useEffect(() => {
        const updatedData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userLink) {
                return { ...item, url: userLink.url, enabled: userLink.enabled }
            }
            return item
        })
        setDevTreeLinks(updatedData);
    }, [])



    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreeLinks(updatedLinks);

    }
    //Obtiene los links actuales de la base de datos asi esten vacios
    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                }
                else {
                    toast.error('URL no valida')
                }
            }
            return link
        })

        setDevTreeLinks(updatedLinks);

        //arreglo auxiliar para almacenar los link habilitados
        let updateItem: SocialNetwork[] = []

        //busca el link hablitado
        const selectSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)

        /** En esta condicional primero: 
         * 1. Verifica si el link seleccionado esta habilitado
         *      a. Si es asi, asigna un id basado en la cantidad de links habilitados actualmente
         *      b. Luego verifica si el link ya existe en la lista de links del usuario
         *          i. Si existe, actualiza su estado a habilitado y asigna el id
         *          ii. Si no existe, crea un nuevo objeto link con el id asignado y lo agrega a la lista
         * 2. Si el link seleccionado no esta habilitado
         */
        if (selectSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)) {
                updateItem = links.map(link => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })
            } else {
                const newItem = {
                    ...selectSocialNetwork,
                    id
                }
                updateItem = [...links, newItem]
            }
        } else {
            //
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updateItem = links.map(link => {
                if (link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if (link.id > indexToUpdate) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        //almacena en la base de datos los links unicamente habilitados
        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updateItem)
            }
        })
    }

    return (
        <div className="space-y-5">
            {
                devTreeLinks.map(item => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                        handleEnableLink={handleEnableLink}
                    />
                ))
            }
            <button
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
                onClick={() => mutate(user)}
            >Guardar cambios</button>
        </div>
    )
}
