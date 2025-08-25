import { Request, Response } from "express";
import Usuario from "../models/Usuario";

export class UsuarioController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const usuarios = await Usuario.find({});
      res.status(201).json({
        data: usuarios,
        message: "Listado de usuarios",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { email, password, nombre, apellido, telefono, dni, fechaNacimiento, numeroLicencia, tipoLiencia } = req.body;

    try {
      const usuarioExistente = await Usuario.findOne({ where: { email } });

      if (usuarioExistente) {
        const error = new Error(`Ese email ya está registrado`);
        return res.status(409).json({ error: error.message });
      }

      const usuario = new Usuario({ email, password, nombre, apellido, telefono, dni, fechaNacimiento, numeroLicencia, tipoLiencia });

      await usuario.save();

      res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    const { usuarioID } = req.params;
    try {
      const usuario = await Usuario.findById(usuarioID);

      if (!usuario) {
        const error = new Error(`Usuario no ID ${usuarioID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }
      res.status(201).json({ data: usuario });
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

      // TODO: Implementacion HASH de password
      if (password) {
        updateData.password = password;
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
    const { usuarioID } = req.params;
    try {
      const usuario = await Usuario.findById(usuarioID);

      if (!usuario) {
        const error = new Error(`Usuario no ID ${usuarioID} no encontrado`);
        return res.status(404).json({ error: error.message });
      }

      usuario.activo = !usuario.activo;
      await usuario.save();

      res
        .status(201)
        .json({ message: `Usuario ${usuario.apellido}, ${usuario.nombre} ${usuario.activo ? "habilitado" : "deshabilitado"} exitosamente` });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al desactivar" });
    }
  };
}
