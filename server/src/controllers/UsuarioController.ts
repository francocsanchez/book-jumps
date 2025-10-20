import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import Club from "../models/Club";
import { checkPassword, generateJWT, hashPassword, monthKey } from "../utils";
import Cuota from "../models/Cuota";
import { Types } from "mongoose";

export class UsuarioController {
  //* ------------------- Rutas usuarios login
  static loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      if (!usuario.activo) {
        res.status(403).json({ message: "Usuario desactivado" });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, usuario.password);

      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Password incorrecto" });
        return;
      }

      const token = generateJWT({ id: usuario._id as Types.ObjectId });

      res.status(200).send(token);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al crear el código" });
    }
  };

  static userData = async (req: Request, res: Response): Promise<void> => {
    res.json(req.usuario);
    return;
  };

  //* ------------------- Rutas usuarios extras
  static getAllActivos = async (req: Request, res: Response) => {
    try {
      const usuarios = await Usuario.find({ activo: true });
      res.status(200).json({
        data: usuarios,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios activos" });
    }
  };

  static getUsuarioVIew = async (req: Request, res: Response) => {
    try {
      const cuotas = await Cuota.find({ usuario: req.usuario._id });

      res.status(200).json({
        usuario: req.usuario,
        cuotas,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error al listar los usuarios activos" });
    }
  };

  //* ------------------- Rutas CRUD usuario
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

      const newUsuario = new Usuario(req.body);
      newUsuario.password = await hashPassword(String(req.body.dni));

      const esParaca = newUsuario.tiposUsuario.includes("paracaidista");

      if (esParaca) {
        const club = await Club.findOne({ activo: true }).select("valores.cuota").lean();
        const importe = club?.valores?.cuota ?? 0;

        const periodo = monthKey();

        await Cuota.updateOne(
          { usuario: newUsuario._id, periodo },
          {
            $setOnInsert: {
              usuario: newUsuario._id,
              periodo,
              importe,
              estado: "pendiente",
            },
          },
          { upsert: true }
        );
      }

      await newUsuario.save();
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
      console.log(error);
      console.error(error.message);
      res.status(500).json({ message: "Error al desactivar" });
    }
  };
}
