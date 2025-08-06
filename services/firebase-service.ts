// services/firebase-service.ts
import { db, auth } from '@/lib/firebase-config';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Interfaz para los datos del usuario
interface UserData {
  username: string;
  email: string;
  level: string;
  testScore: number;
  avatar: string;
  isLoggedIn: boolean;
  coins: number;
  currentStreak: number;
  completedLessons: number;
  totalLessons: number;
}

// Función para registrar un nuevo usuario
export const registerUser = async (email: string, password: string, username: string): Promise<{ success: boolean; message: string; user?: UserData }> => {
  try {
    // Simulación de registro con localStorage
    // En un entorno real, aquí usarías Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const newUser: UserData = {
      username,
      email,
      level: "principiante",
      testScore: 0,
      avatar: "/placeholder.svg?height=100&width=100", // Avatar por defecto
      isLoggedIn: true,
      coins: 50,
      currentStreak: 0,
      completedLessons: 0,
      totalLessons: 45,
    };

    // Guardar datos del usuario en Firestore
    await setDoc(doc(db, "users", firebaseUser.uid), newUser);

    // Guardar en localStorage para simular la sesión en el cliente
    localStorage.setItem("user", JSON.stringify(newUser));

    console.log("Usuario registrado en Firebase y localStorage:", newUser);
    return { success: true, message: "¡Registro exitoso!", user: newUser };
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);
    let errorMessage = "Error al registrar. Inténtalo de nuevo.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Este correo ya está registrado.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }
    return { success: false, message: errorMessage };
  }
};

// Función para iniciar sesión
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: UserData }> => {
  try {
    // Simulación de inicio de sesión con localStorage
    // En un entorno real, aquí usarías Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Obtener datos del usuario de Firestore
    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as UserData;
      const updatedUser = { ...userData, isLoggedIn: true };
      await updateDoc(userDocRef, { isLoggedIn: true }); // Actualizar estado de login en Firestore
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Usuario inició sesión:", updatedUser);
      return { success: true, message: "¡Inicio de sesión exitoso!", user: updatedUser };
    } else {
      console.warn("No se encontraron datos de usuario en Firestore para:", firebaseUser.uid);
      return { success: false, message: "No se encontraron datos de usuario." };
    }
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error);
    let errorMessage = "Correo o contraseña incorrectos.";
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = "Correo o contraseña incorrectos.";
    }
    return { success: false, message: errorMessage };
  }
};

// Función para cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    console.log("Usuario cerró sesión.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Función para obtener datos del usuario actual
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return null;
  }
};

// Función para actualizar el avatar del usuario
export const updateUserAvatar = async (uid: string, avatarUrl: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { avatar: avatarUrl });

    // Actualizar también en localStorage si el usuario está logueado
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.avatar = avatarUrl;
      localStorage.setItem("user", JSON.stringify(user));
    }
    console.log("Avatar actualizado en Firebase y localStorage.");
    return true;
  } catch (error) {
    console.error("Error al actualizar avatar:", error);
    return false;
  }
};

// Función para guardar la puntuación del test de nivel
export const saveUserTestScore = async (uid: string, level: string, testScore: number): Promise<boolean> => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { englishLevel: level, testScore: testScore });

    // Actualizar también en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.level = level;
      user.testScore = testScore;
      localStorage.setItem("user", JSON.stringify(user));
    }
    console.log("Puntuación del test guardada en Firebase y localStorage.");
    return true;
  } catch (error) {
    console.error("Error al guardar puntuación del test:", error);
    return false;
  }
};
