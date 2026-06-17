// API configuration and service calls

import { Nivel } from "../models/Nivel"
import { JwtResponse } from "../models/JwtResponse"
import { EvaluacionResponse } from "../models/EvaluacionResponse"
import { ProgresoDTO } from "../models/ProgresoDTO"

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const api = {
  // Authentication
  login: async (nombre: string, password: string): Promise<JwtResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        
        nombreUsuario:nombre, 
        password:password })
    })

    if (!response.ok){
      throw new Error(`Error en el Login: ${response.status}`);

    }
    const Userlogin:JwtResponse= await  response.json()
    return Userlogin;
  },

  register: async (name: string, password: string): Promise<JwtResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         nombreUsuario: name, // Maps the frontend variable to the backend JSON key
         password: password })
    })


      if (!response.ok) {
      // If the backend returns a 400 or 500 status (e.g., email already exists)
      throw new Error(`Error en el registro: ${response.status}`);
    }
    const userData:JwtResponse= await response.json()
    
    return userData;
  },

  // Get user profile
  getUserProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })


    if (!response.ok) {
      // If the backend returns a 400 or 500 status (e.g., email already exists)
      throw new Error(`Error en el pull del user solicitado: ${response.status}`);
    }

    const Userlogin:JwtResponse= await  response.json()
    return Userlogin;
  },


  //Get nivel
  getNivel:async(token:string,number_nivel:number) => {
    const response= await fetch (`${API_BASE_URL}/niveles/${number_nivel}`,{
      headers:{'Authorization': `Bearer ${token}`}
    })

    // 2. Check if the network request was successful (Status 200 OK)
    if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch level ${number_nivel}`);
      }

    const nivelData:Nivel=  await response.json();
  
    return nivelData

  },

evaluarScript: async (token: string, number_level: number, codigo: string): Promise<EvaluacionResponse> => {


  console.log(codigo);
  // Check your Java Controller to see if you need to add "/evaluar" at the end of this URL!
  const response = await fetch(`${API_BASE_URL}/scripts/evaluar/${number_level}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    },
    // Shorthand: Since key and variable are both 'codigo', you only need to write it once
    body: JSON.stringify({ codigo }) 
  });

  if (!response.ok) {
   
    const errorText = await response.text(); 
    throw new Error(`Error ${response.status}: ${errorText || 'Fallo al evaluar el código'}`);
  }

  const resultado: EvaluacionResponse = await response.json();
  
  return resultado;
},

getprogress: async (token:string): Promise <ProgresoDTO[]> =>{
  try {
     
      const response = await fetch(`${API_BASE_URL}/progreso/obtenerallprogress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener progreso: ${response.status}`);
      }

      const data: ProgresoDTO[] = await response.json();
      return data;

    } catch (error) {
      console.error("Error en la petición GET obtenerTodoElProgreso:", error);
      throw error; 
    }
  }


};

