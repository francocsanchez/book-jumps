import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { hashPassword } from "../utils/HasPassword";
import Membresia from "../models/Membresia";

export class UsuarioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const usuarios = await Usuario.find({});
      res.status(200).json({
        data: usuarios,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const { clubID } = req.params;
      const { email, nombre, apellido, telefono, dni, fechaNacimiento } = req.body;

      const usuarioExistente = await Usuario.findOne({ email });

      if (usuarioExistente) {
        const error = new Error(`Ese email ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const usuario = new Usuario({ email, nombre, apellido, telefono, dni, fechaNacimiento });
      usuario.password = await hashPassword(String(dni));

      const membresia = new Membresia({ usuario: usuario._id, club: clubID, rolesEnClub: ["miembro"] });
      Promise.allSettled([usuario.save(), membresia.save()]);

      res.status(200).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ data: req.usuario });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar usuario" });
    }
  };

  static updateByID = async (req: Request, res: Response) => {
    const { usuarioID } = req.params;
    const { password, ...rest } = req.body;

    try {
      const updateData: any = { ...rest };

      if (password) {
        updateData.password = await hashPassword(password);
      }

      const updatedUser = await Usuario.findByIdAndUpdate(usuarioID, updateData, { new: true });
      if (!updatedUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      req.usuario.activo = !req.usuario.activo;

      console.log(req.usuario.activo);
      console.log(req.usuario);

      const membresia = await Membresia.findOne({ usuario: req.usuario._id });

      if (!req.usuario.activo) {
        membresia.activo = false;
        await membresia.save();
      }

      if (req.usuario.activo) {
        membresia.activo = true;
        await membresia.save();
      }

      await req.usuario.save();
      res.status(200).json({
        message: `Usuario ${req.usuario.apellido}, ${req.usuario.nombre} ${req.usuario.activo ? "habilitado" : "deshabilitado"} exitosamente`,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al desactivar" });
    }
  };
}
