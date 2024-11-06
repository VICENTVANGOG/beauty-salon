"use client";
import {
    IPostService,
} from "@/app/core/application/dto";
import { ServicesService } from "@/app/infrastructure/services/service.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormField } from "../molecules/common/FormField";

const postServiceSchema = yup.object().shape({
    name: yup
        .string()
        .required("El nombre es obligatorio"),
    description: yup
        .string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .required("La descripción es obligatoria"),
    price: yup
        .number()
        .positive("El precio debe ser un número positivo")
        .required("El precio es obligatorio"),
});

const useService = new ServicesService()

export const PostServiceForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IPostService>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(postServiceSchema),
    });


    const handlePostService = async (data: IPostService) => {
        console.log(data);
        try {
            await useService.create(data);
            alert("Servicio agregado correctamente");
            
        
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form
            className="w-full max-w-sm mx-auto p-4 space-y-4"
            onSubmit={handleSubmit(handlePostService)}
        >
            <h2 className="text-2xl font-semibold text-center">Agregar Servicio</h2>

            <FormField<IPostService>
                control={control}
                type="text"
                label="Nombre del Servicio"
                name="name"
                error={errors.name}
                placeholder="Ingresa el nombre del servicio"
            />

            <FormField<IPostService>
                control={control}
                type="text"
                label="Descripción"
                name="description"
                error={errors.description}
                placeholder="Ingresa una descripción"
            />

            <FormField<IPostService>
                control={control}
                type="number"
                label="Precio"
                name="price"
                error={errors.price}
                placeholder="Ingresa el precio"
            />

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
                Agregar Servicio
            </button>
        </form>
    );
};