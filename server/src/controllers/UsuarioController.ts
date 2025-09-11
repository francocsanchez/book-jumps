import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { hashPassword } from "../utils/hasPassword";

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
      const { email, dni } = req.body;

      let usuarioExistente = await Usuario.findOne({ email });

      if (usuarioExistente) {
        const error = new Error(`Ese email ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      usuarioExistente = await Usuario.findOne({ dni });

      if (usuarioExistente) {
        const error = new Error(`Ese DNI ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const usuario = new Usuario(req.body);
      usuario.password = await hashPassword(String(req.body.dni));
      await usuario.save();

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

    try {
      const updatedUser = await Usuario.findByIdAndUpdate(usuarioID, req.body, { new: true });
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
