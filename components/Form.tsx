'use client'

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const Form = ({ type }: { type: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate name
    if (!formData.name || formData.name.length < 3) {
      toast({
        variant: "destructive",
        title: "Invalid name!",
        description: "Name should be at least 3 characters",
      });
      return;
    }

    // Validate Email
    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "Email is Required!",
        description: "Please enter an email",
      });
      return;
    } else {
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);

      if (!isValidEmail) {
        toast({
          variant: "destructive",
          title: "Invalid email!",
          description: "Please enter a valid email",
        });
        return;
      }
    }

    // Validate password
    if (!formData.password) {
      toast({
        variant: "destructive",
        title: "Password is Required!",
        description: "Please enter a password",
      });

      return;
    } else {
      const isValidPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          formData.password
        );

      if (!isValidPassword) {
        toast({
          variant: "destructive",
          title: "Invalid password!",
          description:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        });
        return;
      }
    }

    // Check password and verify it
    if (!(formData.password === formData.re_password)) {
      toast({
        title: "Password doesn't match",
        description: "Password and re-password must be same",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: response.data.token,
        })
      );

      console.log("Successfully registered: ", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        re_password: "",
      });

      router.push("/");
    } catch (error: any) {
      console.log(`Error while registering: ${error.message}`);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "Email is Required!",
        description: "Please enter an email",
      });
      return;
    }

    if (!formData.password) {
      toast({
        variant: "destructive",
        title: "Password is Required!",
        description: "Please enter a password",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: response.data.token,
        })
      );
      console.log("Response: ", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Error while logging in: ", error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="mx-[2rem] mt-[2rem] md:mx-[10rem] lg:w-[30rem] flex flex-col gap-2 lg:mx-auto"
      onSubmit={type === "register" ? handleSignUp : handleSignIn}
    >
      {type === "register" && (
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {type === "register" && (
        <Input
          type="password"
          placeholder="Re-enter password"
          name="re_password"
          value={formData.re_password}
          onChange={handleChange}
        />
      )}
      <Button type="submit">
        {type === "register" ? "Sign Up" : "Sign In"}
      </Button>
    </form>
  );
};
