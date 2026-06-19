import Navbar from "@/components/layout/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gold-primary/20 border-t-gold-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    </>
  );
}
