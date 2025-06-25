
// Website Manajemen Karyawan Restoran "Warung Om dan Tante" dengan Tema Pantai dan Fitur Absen

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManajemenKaryawan() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [status, setStatus] = useState("on duty");
  const [karyawanList, setKaryawanList] = useState([]);
  const [absenList, setAbsenList] = useState([]);

  const handleRegister = () => {
    if (username && password) {
      const existing = users.find((u) => u.username === username);
      if (!existing) {
        setUsers([...users, { username, password }]);
        setIsRegistering(false);
        setUsername("");
        setPassword("");
        alert("Registrasi berhasil! Silakan login.");
      } else {
        alert("Username sudah terdaftar");
      }
    }
  };

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    } else {
      alert("Login gagal. Username atau password salah.");
    }
  };

  const handleTambahKaryawan = () => {
    if (nama && jabatan) {
      const newKaryawan = { nama, jabatan };
      setKaryawanList([newKaryawan, ...karyawanList]);
      setNama("");
      setJabatan("");
    }
  };

  const handleAbsen = () => {
    if (nama && jabatan && hari && jam) {
      const newAbsen = { nama, jabatan, hari, jam, status };
      setAbsenList([newAbsen, ...absenList]);
      setHari("");
      setJam("");
      setStatus("on duty");
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-blue-300">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-bold text-center text-sky-800">
              {isRegistering ? "Buat Akun Baru" : "Login Pengguna"}
            </h2>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full bg-sky-600 hover:bg-sky-700" onClick={isRegistering ? handleRegister : handleLogin}>
              {isRegistering ? "Daftar" : "Login"}
            </Button>

            <p className="text-sm text-center text-sky-800 cursor-pointer underline" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-800">
        Manajemen Karyawan - Warung Om & Tante 🏝️
      </h1>

      <Card className="max-w-xl mx-auto mb-10">
        <CardContent className="space-y-4 p-6">
          <p className="text-sky-700 font-medium">Login sebagai: {currentUser.username}</p>

          <Label htmlFor="nama">Nama Karyawan</Label>
          <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama" />

          <Label htmlFor="jabatan">Jabatan</Label>
          <Input id="jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)} placeholder="Contoh: Kasir, Koki, Waiter" />

          <Button className="w-full bg-sky-600 hover:bg-sky-700" onClick={handleTambahKaryawan}>
            Tambah Karyawan
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-xl mx-auto mb-10">
        <CardContent className="space-y-4 p-6">
          <Label htmlFor="hari">Hari Tugas</Label>
          <Input id="hari" value={hari} onChange={(e) => setHari(e.target.value)} placeholder="Contoh: Senin, Selasa" />

          <Label htmlFor="jam">Jam Tugas (HH:MM)</Label>
          <Input id="jam" type="time" value={jam} onChange={(e) => setJam(e.target.value)} />

          <Label htmlFor="status">Status</Label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
            <option value="on duty">On Duty</option>
            <option value="off duty">Off Duty</option>
          </select>

          <Button className="w-full bg-sky-600 hover:bg-sky-700" onClick={handleAbsen}>
            Simpan Jadwal Absen
          </Button>
        </CardContent>
      </Card>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-sky-800">Daftar Karyawan</h2>
        <div className="space-y-3">
          {karyawanList.map((k, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-4">
                <p className="font-medium">{k.nama}</p>
                <p className="text-sm text-gray-600">Jabatan: {k.jabatan}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4 text-sky-800">Jadwal On/Off Duty</h2>
        <div className="space-y-3">
          {absenList.map((a, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-4">
                <p className="font-medium">{a.nama} ({a.jabatan})</p>
                <p className="text-sm text-gray-600">
                  {a.hari} - {a.jam} ({a.status})
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

