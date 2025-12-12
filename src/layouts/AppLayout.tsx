import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const { data, isError, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        refetchOnWindowFocus: false,
        retry: 1
    })

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'/auth/login'} />

    if(data) return <DevTree data={data}/>
}