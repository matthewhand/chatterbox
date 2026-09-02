# Chatterbox — AMD Strix Halo fork

**Upstream launcher:** https://github.com/Deathdadev/chatterbox

**Why this fork exists.** Stock Pinokio launchers install NVIDIA CUDA PyTorch or generic ROCm 6.x wheels. Those builds have no kernels for AMD Ryzen AI Max+ 395 / Radeon 8060S (**gfx1151**). On this APU they either never initialize CUDA or silently run on CPU.

**What we achieved.**
- Linux AMD `torch.js` installs TheRock gfx1151 nightlies from `https://rocm.nightlies.amd.com/v2/gfx1151/` (no PyPI extra-index — that pulled CUDA torch).
- Start scripts set `HIP_VISIBLE_DEVICES=0`, `HSA_OVERRIDE_GFX_VERSION=11.5.1`, and treat AMD as HIP `cuda`.
- Verified in the app venv: `torch.cuda.is_available() == True`, device **Radeon 8060S Graphics**, HIP matmul on `cuda:0`.

This is a **Pinokio launcher** fork. The model repo under `app/` is still cloned from its original project.

---# Chatterbox

A pinokio script for https://github.com/resemble-ai/chatterbox.git

