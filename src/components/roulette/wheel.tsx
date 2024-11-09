import { /* cn */ } from "@/lib/utils";

// Fix the useEffect dependency
useEffect(() => {
  // Your effect code here
}, [rotation, onSpinComplete]); // Add missing dependencies 