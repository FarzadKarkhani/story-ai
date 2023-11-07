'use client';

import axios from 'axios';
import { useState } from 'react';
import { Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, 'STRIPE_CLIENT_ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-2 font-bold">
                Story AI Premium
                <Badge variant="premium" className="uppercase text-sm py-1">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="flex justify-center">
              Go beyond the limits and unlock your account
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onSubscribe}
              variant="premium"
              size="lg"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
