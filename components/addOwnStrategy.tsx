"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const AddOwnStrategy = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title || !description || !content || !image) {
      setError("All fields must be filled.");
      return;
    }

    const strategy = {
      id: Date.now(),
      title,
      description,
      content,
      image,
    };
    const existingStrategies = JSON.parse(
      localStorage.getItem("ownStrategies") || "[]"
    );
    existingStrategies.push(strategy);
    localStorage.setItem("ownStrategies", JSON.stringify(existingStrategies));

    setShowDialog(false);
    setTitle("");
    setDescription("");
    setContent("");
    setImage(null);
    setError("");
  };

  return (
    <div>
      <motion.button
        className="fixed bottom-20 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowDialog(true)}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Your Own Strategy</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm text-gray-400">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm text-gray-400">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter description"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm text-gray-400">
                Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-gray-700 bg-gray-700 text-white"
                placeholder="Enter detailed content"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="image" className="text-sm text-gray-400">
                Choose Image
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border-gray-700 bg-gray-700 text-white"
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
