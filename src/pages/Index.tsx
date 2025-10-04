import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center bg-background px-4">
        <div className="text-center max-w-2xl">
          <h1 className="mb-4 text-2xl md:text-4xl font-bold">Welcome to Your Blank App</h1>
          <p className="text-base md:text-xl text-muted-foreground">Start building your amazing project here!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
