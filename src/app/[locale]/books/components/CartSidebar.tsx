'use client';

import { Sidebar } from 'primereact/sidebar';
import { ShoppingCart, Trash2, PackageCheck, Minus, Plus, X, Tag, CreditCard, Package } from 'lucide-react';
import { useCart } from '@/components/auth/CartContext';
import { ImageWithFallback } from './ImageWithFallback';

interface CartSidebarProps {
  visible: boolean;
  onHide: () => void;
}

export function CartSidebar({ visible, onHide }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  const handleCheckout = () => {
    // if (cartItems.length === 0) {
    //   toast.error('Your cart is empty');
    //   return;
    // }

    // toast.success('Order placed successfully! You will receive a confirmation email shortly.', {
    //   duration: 5000,
    // });
    clearCart();
    onHide();
  };

  const customHeader = (
    <div className="flex items-center justify-between w-full pb-4 border-b border-theme-border">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-xl shadow-lg">
          <ShoppingCart size={22} className="text-white" />
        </div>
        <div>
          <h3 className="text-theme-text m-0 font-bold">Shopping Cart</h3>
          <p className="text-theme-muted text-xs m-0 mt-0.5">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
      <button
        onClick={onHide}
        className="p-2 hover:bg-theme-accent rounded-lg transition-colors text-theme-muted hover:text-theme-text"
        aria-label="Close cart"
      >
        <X size={20} />
      </button>
    </div>
  );

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      className="w-full md:w-[28vw] md:min-w-[500px] lg:w-[25vw] bg-theme-bg cart-sidebar-mobile"
      header={customHeader}
      showCloseIcon={false}
    >
      <div className="flex flex-col h-full -mt-4">
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                    <ShoppingCart size={40} className="text-theme-primary opacity-40" />
                  </div>
                </div>
              </div>
              <h4 className="text-theme-text mb-2 font-semibold">Your cart is empty</h4>
              <p className="text-theme-muted text-sm max-w-xs">
                Discover our collection of scholarly works and add some books to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-xl overflow-hidden hover:shadow-lg hover:border-theme-primary/30 transition-all duration-300 animate-slide-in animation-delay-${index * 100}`}
                >
                  <div className="flex gap-4 p-4">
                    {/* Book Cover */}
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-theme-accent flex-shrink-0 shadow-md ring-1 ring-black/5">
                      <ImageWithFallback
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Title and Remove Button */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="text-theme-text text-sm font-semibold line-clamp-2 flex-1 leading-tight">
                          {item.title}
                        </h5>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            // toast.success('Book removed from cart');
                          }}
                          className="p-1.5 text-theme-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0 hover:scale-110"
                          title="Remove from cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Author */}
                      <p className="text-theme-muted text-xs mb-3">{item.author}</p>

                      {/* Price and Quantity */}
                      <div className="mt-auto space-y-2.5">
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className="text-theme-muted text-xs flex items-center gap-1">
                            <Tag size={12} />
                            Unit Price
                          </span>
                          <span className="text-theme-text text-sm font-semibold">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <span className="text-theme-muted text-xs">Quantity</span>
                          <div className="flex items-center bg-theme-accent rounded-lg border border-theme-border overflow-hidden shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-2 hover:bg-theme-primary hover:text-white transition-all text-theme-text disabled:opacity-50"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-10 text-center text-theme-text text-sm font-semibold bg-theme-bg/50">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
                              className="p-2 hover:bg-theme-primary hover:text-white transition-all text-theme-text disabled:opacity-50"
                              aria-label="Increase quantity"
                              disabled={item.quantity >= 99}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-theme-border/60">
                          <span className="text-theme-text text-xs font-semibold">Subtotal</span>
                          <span className="text-theme-primary text-lg font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary - Fixed at Bottom */}
        {cartItems.length > 0 && (
          <div className="border-t border-theme-border pt-4 mt-4 bg-gradient-to-b from-theme-bg to-theme-accent/20">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-theme-card to-theme-card/50 rounded-xl p-4 mb-3 border border-theme-border shadow-sm">
              <h4 className="text-theme-text font-semibold mb-3 flex items-center gap-2 text-sm">
                <Package size={16} className="text-theme-primary" />
                Order Summary
              </h4>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-theme-text text-sm">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-theme-text text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <PackageCheck size={12} />
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-theme-text text-sm">
                  <span>Tax (est. 10%)</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-theme-border to-transparent my-2" />

                <div className="flex justify-between items-center">
                  <span className="text-theme-text font-bold">Total</span>
                  <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-theme-primary to-theme-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold group"
              >
                <CreditCard size={18} className="group-hover:rotate-12 transition-transform" />
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  clearCart();
                  // toast.success('Cart cleared');
                }}
                className="w-full flex items-center justify-center gap-2 bg-theme-accent text-theme-text px-6 py-2.5 rounded-xl border border-theme-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-500/10 transition-all duration-200 font-medium"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-3 p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl border border-green-200/50 dark:border-green-500/20">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <PackageCheck size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-green-800 dark:text-green-300 text-xs font-semibold mb-0.5">
                    Free Shipping Included
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-xs">
                    Estimated delivery: 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--theme-border);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--theme-primary);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Sidebar>
  );
}