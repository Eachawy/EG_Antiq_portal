'use client';

import { useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // Redirect to home page when modal is closed
          window.location.href = '/';
        }}
      />
    </div>
  );
}
